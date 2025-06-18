const { prisma } = require("../prismaClient");

async function getMenu() {
  return await prisma.dish.findMany();
}

module.exports = { getMenu };
