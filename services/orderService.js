const { prisma } = require("../prismaClient");

async function createOrder(cart, totalSum, telegramId) {
  const order = await prisma.order.create({
    data: {
      user: { connect: { telegramId: telegramId } },
      price: String(totalSum(cart)),
      orderItems: {
        create: cart.map((item) => ({
          dish: { connect: { id: item.id } },
          price: item.price,
        })),
      },
    },
  });
  return order;
}

async function getCurrentOrder(telegramId) {
  return await prisma.order.findFirst({
    where: {
      user: {
        is: {
          telegramId: String(telegramId),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: {
        include: {
          dish: true,
        },
      },
    },
  });
}

module.exports = { createOrder, getCurrentOrder };
