import fastify from "fastify";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import sensible  from "@fastify/sensible";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie"

dotenv.config();

const app = fastify()
app.register(sensible)
// fake the login requirements. fake the user authentication.
app.register(cookie, { secret: process.env.COOKIE_SECRET })

app.register(cors, {
    origin: process.env.CLIENT_URL,
    credentials: true,
})

// make sure user is authenticated. fake user login
// send down user Id cookie so that server and browser have the same userId
app.addHook("onRequest", (req, res, done) => {
    if (req.cookies.userId !== CURRENT_USER_ID) {
      req.cookies.userId = CURRENT_USER_ID
      res.clearCookie("userId")
      res.setCookie("userId", CURRENT_USER_ID)
    }
    done()
  })



const prisma = new PrismaClient()

// define current user variable. hard code it for now.
const CURRENT_USER_ID = (
    await prisma.user.findFirst({ where: { name: "Abby" } })
).id


const COMMENT_SELECT_FIELDS= {
    // fields that will be needed for comemnts
    id: true,
    message: true,
    parentId: true,
    createdAt: true,
    user: {
        // checks about user information
        select: {
            id: true,
            name: true,
        },
    },
}

app.get("/posts", async (req,res) => {
    return await commitToDb(
        prisma.post.findMany({ 
            select: {
                id:true,
                title:true,
                image: true,
                summary: true,
                },
            })
    )
})

app.get("/posts/:id", async (req,res) => {
    return await commitToDb(
        prisma.post.findUnique({ 
            // match the correct id for this post.
            where: {id: req.params.id},
            // get all info needed for this post
            select: {
                body: true,
                title: true,
                comments: {
                    // old comments will show up at bottom
                    orderBy: {
                        createdAt: "desc"
                    },
                    select: {
                        ...COMMENT_SELECT_FIELDS,
                        _count: {select: {likes: true}},
                        },
                    },

                },
            })
            .then(async post => {
                // queries all the likes that current user has made
                const likes = await prisma.like.findMany({
                    where: {
                        userId: req.cookies.userId,
                        commentId: {in: post.comments.map(comment => comment.id)}
                    }
                })
                return {
                    ...post,
                    comments: post.comments.map(comment => {
                        const {_count, ...commentFields} = comment
                        return {
                            ...commentFields,
                            // is it liked by current user
                            likedByMe: likes.find(like => likes.commentId === comment.id),
                            // all likes on this comment
                            likeCount: _count.likes,
                        }
                    })
                }
            })
    )
})

app.post("/posts/:id/comments", async (req, res) => {
    // Error handling. Make user message has content before submitting.
    if (req.body.message === "" || req.body.message === null) {
        return res.send(app.httpErrors.badRequest("No content detected")
        )
    }

    return await commitToDb(
        prisma.comment
          .create({
            data: {
              message: req.body.message,
              userId: req.cookies.userId,
              parentId: req.body.parentId,
              postId: req.params.id,
            },
            select: COMMENT_SELECT_FIELDS,
          })
          .then(comment => {
            return {
              ...comment,
            //   new posts should have zero likes by all users
              likeCount: 0,
              likedByMe: false,
            }
          })
      )
})

app.put("/posts/:postId/comments/:commentId", async (req, res) => {
    if (req.body.message === "" || req.body.message === null) {
        return res.send(app.httpErrors.badRequest("No content detected")
        )
    }

    // get user id to check if this user is editing their a message they created
    // Do not allow users to edit comments made by other users
    const { userId } = await prisma.comment.findUnique({
        //get user id for current comment
        where: { id: req.params.commentId },
        select: { userId: true },
      })

      // return error if user is attempting to edit a comment that doesn't belong to them
      if (userId !== req.cookies.userId) {
        return res.send(
          app.httpErrors.unauthorized(
            "You don't have permission to edit this"
          )
        )
    }

    // user has passed authentication test
    // updated content is allowed to change the content
    return await commitToDb(
        prisma.comment.update({
          where: { id: req.params.commentId },
          data: { message: req.body.message },
          select: { message: true },
        })
    )
})

app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
    const { userId } = await prisma.comment.findUnique({
        //get user id for current comment
        where: { id: req.params.commentId },
        select: { userId: true },
      })

      // return error if user is attempting to edit a comment that doesn't belong to them
      if (userId !== req.cookies.userId) {
        return res.send(
          app.httpErrors.unauthorized(
            "You don't have permission to delete this"
          )
        )
    }
    return await commitToDb(
        prisma.comment.delete({
          where: { id: req.params.commentId },
          select: { id: true },
        })
    )

})

// route for toggling like
app.post("/posts/:postId/comments/:commentId/toggleLike", async (req, res) => {
    const data = {
        commentId: req.params.commentId,
        userId: req.cookies.userId
    }

        // get current existing likes. find the unique one where it has this comment id and user id.
        // the userid and commentid are the same here
    const like = await prisma.like.findUnique({
        where: { userId_commentId: data },
      })
    
        // check to see if there is no current like by user.
      if (like == null) {
        return await commitToDb(prisma.like.create({ data })).then(() => {
            // program has created a unique like, so increment the likes by 1
          return { addLike: true }
        })
      } else {
        // remove the like if comment has already been liked
        return await commitToDb(
          prisma.like.delete({ where: { userId_commentId: data } })
        ).then(() => {
          return { addLike: false }
        })
      }
    })


async function commitToDb(promise) {
    const [error, data] = await app.to(promise)
    if (error) return app.httpErrors.internalServerError
    return data
}

app.listen({port: process.env.PORT})