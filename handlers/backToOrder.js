const { getMenuByType } = require("../services/dishService");
const { getMenuKeyboard } = require("../keyboards");

async function backToOrder(ctx) {
  await ctx.answerCallbackQuery();
  const menuItems = await getMenuByType(ctx.session.selectedMealType);
  await ctx.api.editMessageCaption(
    ctx.session.chat_id,
    ctx.session.message_id,
    {
      caption: `Choose what you would like for ${ctx.session.selectedMealType}?`,
      reply_markup: await getMenuKeyboard(
        menuItems,
        ctx.session.selectedItem,
        ctx.session.cart,
        ctx.session.selectedMealType
      ),
    }
  );
}

module.exports = { backToOrder };
