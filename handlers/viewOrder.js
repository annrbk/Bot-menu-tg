const { InputFile } = require("grammy");
const { backKeyboard } = require("../keyboards");
const { totalSum } = require("../utils/totalSum");
const path = require("path");

async function viewOrder(ctx) {
  await ctx.answerCallbackQuery();
  const cart = ctx.session.cart;
  if (cart && cart.length > 0) {
    await ctx.api.editMessageMedia(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        type: "animation",
        media: new InputFile(path.join(__dirname, "../gif/thanks.gif")),
      }
    );
    await ctx.api.editMessageCaption(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        caption: `Thank you for choosing us!❤️\n\n📋Your order:\n\n${cart.map((item) => `${item.name}, price: ${item.price}💋`).join("\n")} \n\nTotal: ${totalSum(cart)} kiss💋`,
        reply_markup: backKeyboard,
      }
    );
  } else {
    await ctx.reply("Your cart is empty");
  }
}

module.exports = { viewOrder };
