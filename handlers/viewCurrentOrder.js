const { InputFile } = require("grammy");
const { backToOrderKeyboard } = require("../keyboards");
const { totalSum } = require("../utils/totalSum");
const path = require("path");
const { createOrder } = require("../services/orderService");

async function viewCurrentOrder(ctx) {
  await ctx.answerCallbackQuery();
  const cart = ctx.session.cart;
  if (cart && cart.length > 0) {
    await createOrder(cart, totalSum);
    await ctx.api.editMessageMedia(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        type: "animation",
        media: new InputFile(path.join(__dirname, "../gif/gifInCart.gif")),
      }
    );

    await ctx.api.editMessageCaption(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        caption: `📋Your order:\n\n${cart.map((item) => `${item.name}, price: ${item.price}💋`).join("\n")} \n\nTotal: ${totalSum(cart)} kiss💋`,
        reply_markup: backToOrderKeyboard(),
      }
    );
  } else {
    await ctx.reply("Your cart is empty");
  }
}

module.exports = { viewCurrentOrder };
