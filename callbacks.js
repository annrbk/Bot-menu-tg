const { handleCartItem } = require("./handlers/handleCartItem");
const { chooseItems } = require("./handlers/chooseItems");
const { getMenuByType } = require("./services/dishService");
const { chooseMealType } = require("./handlers/chooseMealType");
const { handleNextMealStep } = require("./handlers/handleNextMealStep");

async function handleMenuSelection(ctx) {
  const item = ctx.callbackQuery.data;
  const mealType = ctx.session.selectedMealType;

  const menuItems = await getMenuByType(mealType);

  if (item === "BREAKFAST" || item === "LUNCH" || item === "DINNER") {
    return chooseMealType(ctx, item);
  }

  if (menuItems.some((menuItem) => menuItem.name === item)) {
    return chooseItems(ctx, item);
  }

  if (item === "toggle_button") return handleCartItem(ctx, menuItems);

  if (item === "next_button") return handleNextMealStep(ctx);
}

module.exports = { handleMenuSelection };
