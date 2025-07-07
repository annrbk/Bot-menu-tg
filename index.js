require("dotenv").config();
const {
  Bot,
  GrammyError,
  HttpError,
  MemorySessionStorage,
  session,
} = require("grammy");
const { start, menu, myorder, cancelOrder } = require("./commands");
const { handleMenuSelection } = require("./callbacks");
const { backToMenu } = require("./handlers/backToMenu");
const { viewCurrentOrder } = require("./handlers/viewCurrentOrder");
const { backToOrder } = require("./handlers/backToOrder");
const { viewCart } = require("./handlers/viewCart");
const { sendNotification } = require("./cron");

const adapter = new MemorySessionStorage();
const bot = new Bot(process.env.BOT_API_KEY);

bot.use(session({ initial: () => ({}), storage: adapter }));

sendNotification(bot);

bot.api.setMyCommands([
  {
    command: "start",
    description: "Launch a bot",
  },
  {
    command: "menu",
    description: "Show menu",
  },
  {
    command: "myorder",
    description: "Show my current order",
  },
  {
    command: "cancel_order",
    description: "Cancel order",
  },
]);

bot.command("start", start);
bot.command("menu", menu);
bot.command("myorder", myorder);
bot.command("cancel_order", cancelOrder);

bot.callbackQuery("view_order", viewCurrentOrder);
bot.callbackQuery("back_to_menu", backToMenu);
bot.callbackQuery("back_to_order", backToOrder);
bot.callbackQuery("view_cart", viewCart);

bot.on("callback_query:data", handleMenuSelection);

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
