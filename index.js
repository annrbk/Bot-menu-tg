require("dotenv").config();
const { Bot, GrammyError, HttpError, InlineKeyboard } = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
  {
    command: "start",
    description: "Launch a bot",
  },
  {
    command: "menu",
    description: "Show menu",
  },
]);

bot.command("start", async (ctx) => {
  await ctx.reply(`Hi there! 👋 I'm your MenuHub Bot.  
Ready to help you choose something tasty! 🍽️  
Select a command below`);
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
