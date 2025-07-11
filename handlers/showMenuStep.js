const {
  getBreakfastMenu,
  getLunchMenu,
  getDinnerMenu,
} = require("../services/dishService");
const { getMenuKeyboard } = require("../keyboards");
const { InputFile } = require("grammy");
const path = require("path");

async function showMenuStep(ctx, mealType) {
  let menuItems;
  let caption;

  switch (mealType) {
    case "BREAKFAST":
      menuItems = await getBreakfastMenu();
      caption = "Choose what you would like for BREAKFAST?";
      break;
    case "LUNCH":
      menuItems = await getLunchMenu();
      caption = "Choose what you would like for LUNCH?";
      break;
    case "DINNER":
      menuItems = await getDinnerMenu();
      caption = "Choose what you would like for DINNER?";
      break;
  }

  await ctx.api.editMessageMedia(ctx.session.chat_id, ctx.session.message_id, {
    type: "animation",
    media: new InputFile(path.join(__dirname, "../gif/gifNextStep.gif")),
  });

  await ctx.api.editMessageCaption(
    ctx.session.chat_id,
    ctx.session.message_id,
    {
      caption: caption,
      reply_markup: await getMenuKeyboard(
        menuItems,
        null,
        ctx.session.cart,
        mealType
      ),
    }
  );
}

module.exports = { showMenuStep };
