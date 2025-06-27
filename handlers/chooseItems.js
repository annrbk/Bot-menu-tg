const { getMenuByType } = require("../services/dishService");
const { getMenuKeyboard } = require("../keyboards");

async function chooseItems(ctx, item) {
  await ctx.answerCallbackQuery();
  if (!ctx.session.cart) ctx.session.cart = [];
  const selectedMealType = ctx.session.selectedMealType;

  const menuItems = await getMenuByType(selectedMealType);

  const selectedItem = menuItems.find((menuItem) => menuItem.callback === item);
  if (selectedItem) {
    ctx.session.selectedItem = selectedItem;
    await ctx.api.editMessageMedia(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        type: "photo",
        media: selectedItem.imgUrl,
      }
    );
    await ctx.api.editMessageCaption(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        caption: `You have chosen: ${selectedItem.name}\nPrice: ${selectedItem.price}💋`,
        reply_markup: await getMenuKeyboard(
          menuItems,
          ctx.session.selectedItem,
          ctx.session.cart
        ),
      }
    );
  }
}

module.exports = { chooseItems };
