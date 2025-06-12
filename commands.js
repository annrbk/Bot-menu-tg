const { InputFile } = require("grammy");
const { getMenuKeyboard } = require("./keyboards");
const path = require("path");

async function start(ctx) {
  await ctx.reply(`Hi there! 👋 I'm your MenuHub Bot.  
Ready to help you choose something tasty! 🍽️  
Select a command below`);
}

async function menu(ctx) {
  const filePath = path.join(__dirname, "./images/hello.jpg");
  let message = await ctx.replyWithPhoto(new InputFile(filePath), {
    caption: "Choose what you would like for breakfast?",
    reply_markup: getMenuKeyboard(
      ctx.session.selectedItem,
      ctx.session.cart || []
    ),
  });
  ctx.session.message_id = message.message_id;
  ctx.session.chat_id = ctx.chat.id;
}

module.exports = { start, menu };
