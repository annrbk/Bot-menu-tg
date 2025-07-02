const { InputFile } = require("grammy");
const { mealTypeKeyboard } = require("./keyboards");
const { saveUser } = require("./services/userService");
const path = require("path");
const { getCurrentOrder } = require("./services/orderService");

async function start(ctx) {
  await ctx.reply(`Hi there! 👋 I'm your MenuHub Bot.  
Ready to help you choose something tasty! 🍽️  
Select a command below`);
  ctx.session.telegramId = String(ctx.from.id);
  ctx.session.username = ctx.from.username;
  ctx.session.firstName = ctx.from.first_name;

  const telegramId = ctx.session.telegramId;
  const username = ctx.session.username;
  const firstName = ctx.session.firstName;

  await saveUser(telegramId, username, firstName);
}

async function menu(ctx) {
  const filePath = path.join(__dirname, "./images/hello.jpg");
  let message = await ctx.replyWithPhoto(new InputFile(filePath), {
    caption: "Select a meal type:",
    reply_markup: mealTypeKeyboard(ctx.session.selectedMealType),
  });
  ctx.session.message_id = message.message_id;
  ctx.session.chat_id = ctx.chat.id;
}

async function myorder(ctx) {
  const order = await getCurrentOrder(String(ctx.from.id));

  if (order && order.orderItems.length) {
    const itemsDescription = order.orderItems
      .map((item) => `${item.dish.name}, price: ${item.price}💋`)
      .join("\n");
    await ctx.replyWithAnimation(
      new InputFile(path.join(__dirname, "./gif/currentOrder.gif")),
      {
        caption: `✅Your current order:\n\n${itemsDescription}`,
      }
    );
  } else {
    await ctx.reply("You don't have a current order");
  }
}

module.exports = { start, menu, myorder };
