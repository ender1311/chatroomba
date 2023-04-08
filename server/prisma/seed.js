import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  const kyle = await prisma.user.create({ data: { name: "Kyle" } })
  const sally = await prisma.user.create({ data: { name: "Sally" } })

  const post1 = await prisma.post.create({
    data: {
      body: "Infants sleep between 9 and 12 hours during the night and nap between 2 and 5 hours during the day. At 2 months, infants take between two and four naps each day, and at 12 months, they take either one or two naps. Expect factors such as illness or a change in routine to disrupt your baby's sleep.",
      title: "Post 1",
    },
  })
  const post2 = await prisma.post.create({
    data: {
      body: "Breast milk provides the best nutrition for most infants, including premature and sick newborns. However, there are rare exceptions when breast milk or breastfeeding is not recommended. Learn more about contraindications to breastfeeding. Only a few medications are contraindicated (not recommended) while breastfeeding.",
      title: "Post 2",
    },
  })

  const comment1 = await prisma.comment.create({
    data: {
      message: "I am a root comment",
      userId: kyle.id,
      postId: post1.id,
    },
  })

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "I am a nested comment",
      userId: sally.id,
      postId: post1.id,
    },
  })

  const comment3 = await prisma.comment.create({
    data: {
      message: "I am another root comment",
      userId: sally.id,
      postId: post1.id,
    },
  })
}

seed()