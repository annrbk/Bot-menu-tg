const { getNextMealType } = require("../utils/mealTypeUtils");
const { viewCartKeyboard } = require("../keyboards");
const { showMenuStep } = require("./showMenuStep");

async function handleNextMealStep(ctx) {
  await ctx.answerCallbackQuery();

  const currentType = ctx.session.selectedMealType;
  const nextType = getNextMealType(currentType);
  ctx.session.selectedMealType = nextType;

  if (nextType === "CART") {
    await ctx.api.editMessageCaption(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        caption: "Ready to view your order? 🧾",
        reply_markup: viewCartKeyboard(),
      }
    );
  } else {
    await showMenuStep(ctx, nextType);
  }
}

module.exports = { handleNextMealStep };
