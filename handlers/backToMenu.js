const { InputFile } = require("grammy");
const { getMenuKeyboard } = require("../keyboards");
const path = require("path");
const { getMenuByType } = require("../services/dishService");

async function backToMenu(ctx) {
  ctx.session.cart = [];
  ctx.session.selectedItem = null;
  ctx.session.selectedMealType = "BREAKFAST";
  const menuItems = await getMenuByType(ctx.session.selectedMealType);
  await ctx.answerCallbackQuery();
  await ctx.api.editMessageMedia(ctx.session.chat_id, ctx.session.message_id, {
    type: "photo",
    media: new InputFile(path.join(__dirname, "../images/hello.jpg")),
  });
  await ctx.api.editMessageCaption(
    ctx.session.chat_id,
    ctx.session.message_id,
    {
      caption: "Choose what you would like for breakfast?",
      reply_markup: await getMenuKeyboard(
        menuItems,
        ctx.session.selectedItem,
        ctx.session.cart,
        ctx.session.selectedMealType
      ),
    }
  );
}

module.exports = { backToMenu };
