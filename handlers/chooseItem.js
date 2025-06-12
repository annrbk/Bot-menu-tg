const { menuItems } = require("../menu");
const { getMenuKeyboard } = require("../keyboards");

async function chooseItem(ctx, item) {
  await ctx.answerCallbackQuery();
  if (!ctx.session.cart) ctx.session.cart = [];
  const selectedItem = menuItems.find((menuItem) => menuItem.name === item);
  if (selectedItem) {
    ctx.session.selectedItem = selectedItem;
    await ctx.api.editMessageMedia(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        type: "photo",
        media: selectedItem.img,
      }
    );
    await ctx.api.editMessageCaption(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        caption: `You have chosen: ${selectedItem.name}\nPrice: ${selectedItem.price}💋`,
        reply_markup: getMenuKeyboard(
          ctx.session.selectedItem,
          ctx.session.cart
        ),
      }
    );
  }
}

module.exports = { chooseItem };
