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

async function deleteCurrentOrder(orderId) {
  await prisma.orderItem.deleteMany({
    where: { orderId: orderId },
  });
  return await prisma.order.delete({ where: { id: orderId } });
}

module.exports = { createOrder, getCurrentOrder, deleteCurrentOrder };
