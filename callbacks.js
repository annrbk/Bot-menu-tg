const { handleCartItem } = require("./handlers/handleCartItem");
const { chooseItems } = require("./handlers/chooseItems");
const { getMenu } = require("./services/dishService");
const { chooseMealType } = require("./handlers/chooseMealType");

async function handleMenuSelection(ctx) {
  const item = ctx.callbackQuery.data;

  const menuItems = await getMenu();

  if (item === "BREAKFAST" || item === "LUNCH" || item === "DINNER") {
    return chooseMealType(ctx, item);
  }

  if (menuItems.some((menuItem) => menuItem.name === item)) {
    return chooseItems(ctx, item);
  }

  if (item === "toggle_button") return handleCartItem(ctx);
}

module.exports = { handleMenuSelection };
