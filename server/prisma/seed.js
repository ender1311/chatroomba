import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  const mike = await prisma.user.create({ data: { name: "Mike" } })
  const abby = await prisma.user.create({ data: { name: "Abby" } })
  const caitlin = await prisma.user.create({ data: { name: "Caitlin" } })
  const emma = await prisma.user.create({ data: { name: "Emma" } })
  
  const post1 = await prisma.post.create({
    data: {
      body: "Infants sleep between 9 and 12 hours during the night and nap between 2 and 5 hours during the day. At 2 months, infants take between two and four naps each day, and at 12 months, they take either one or two naps. Expect factors such as illness or a change in routine to disrupt your baby's sleep.",
      title: "Infant Sleep",
      summary: "Infant sleep plays an important role in a child's development, including cognition and physical growth. Why are there so many different approaches to infant sleep?",
      image: "https://images.unsplash.com/photo-1621963836802-73bd4c1815fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
  })
  const post2 = await prisma.post.create({
    data: {
      body: "Breast milk provides the best nutrition for most infants, including premature and sick newborns. However, there are rare exceptions when breast milk or breastfeeding is not recommended. Learn more about contraindications to breastfeeding. Only a few medications are contraindicated (not recommended) while breastfeeding.",
      title: "Breastfeeding",
      summary: "Historically, it is believed by the majority that breastfeeding provides unmatched health benefits for babies and mothers. However, some studies suggest that breastfeeding may not be the best choice for all mothers and babies.",
      image: "https://cdn.mambaby.com/cd2VrIPi4LUtXXDr6aMp1hpUJPra_X3kvD5QLbcuWU4/rs%3Afit%3A1200%3A1200%3A/gravity%3Asm/aHR0cHM6Ly93d3cubWFtYmFieS5jb20vbWVkaWEvMmQvYTEvNGUvMTYwNjEzMDIxNi9NQU1fRVNBQ19Cb3R0bGVmZWVkaW5nXzIxLmpwZw",
    },
  })

  const comment1 = await prisma.comment.create({
    data: {
      message: "It's been a while for me, but all the sleepless nights were worth it!",
      userId: mike.id,
      postId: post1.id,
    },
  })

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "I'm a single mother of a 2 month old and I am so over this stage of motherhood!",
      userId: caitlin.id,
      postId: post1.id,
    },
  })

  const comment3 = await prisma.comment.create({
    data: {
      message: "Help! my 6 month old is still waking up every 2 hours!",
      userId: emma.id,
      postId: post1.id,
    },
  })

  const comment4 = await prisma.comment.create({
    data: {
      message: "I'm actually a lactation consultant and I do not agree!",
      userId: abby.id,
      postId: post2.id,
    },
  })

}

seed()