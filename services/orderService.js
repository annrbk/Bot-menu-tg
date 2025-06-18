const { prisma } = require("../prismaClient");

async function createOrder(cart, totalSum) {
  const order = await prisma.order.create({
    data: {
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

module.exports = { createOrder };
