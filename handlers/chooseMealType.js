const { getMenuKeyboard } = require("../keyboards");
const { getMenuByType } = require("../services/dishService");

async function chooseMealType(ctx, item) {
  await ctx.answerCallbackQuery();
  ctx.session.selectedMealType = item;

  const menuItems = await getMenuByType(ctx.session.selectedMealType);

  const keyboard = await getMenuKeyboard(
    menuItems,
    null,
    ctx.session.cart,
    ctx.session.selectedMealType
  );

  await ctx.api.editMessageCaption(
    ctx.session.chat_id,
    ctx.session.message_id,
    {
      caption: `Choose what you would like for ${item}?`,
      reply_markup: keyboard,
    }
  );
}

module.exports = { chooseMealType };
