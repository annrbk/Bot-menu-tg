const { prisma } = require("../prismaClient");

async function saveUser(telegramId, username, firstName) {
  const user = await prisma.user.upsert({
    where: { telegramId: telegramId },
    update: { username: username, firstName: firstName },
    create: {
      telegramId: telegramId,
      username: username,
      firstName: firstName,
    },
  });
  return user;
}

module.exports = { saveUser };
