const cron = require("node-cron");
const { prisma } = require("./prismaClient");

function sendNotification(bot) {
  cron.schedule("0 18 * * *", async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          telegramId: true,
        },
      });

      for (const user of users) {
        await bot.api.sendMessage(
          user.telegramId,
          "What would you like to eat tomorrow? Choose your dishes!😋🍴"
        );
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  });
}

module.exports = { sendNotification };
