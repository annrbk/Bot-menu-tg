const { handleCartItem } = require("./handlers/handleCartItem");
const { chooseItem } = require("./handlers/chooseItem");
const { getMenu } = require("./services/dishService");

async function handleMenuSelection(ctx) {
  const item = ctx.callbackQuery.data;

  const menuItems = await getMenu();

  if (menuItems.some((menuItem) => menuItem.name === item)) {
    return chooseItem(ctx, item);
  }

  if (item === "toggle_button") return handleCartItem(ctx);
}

module.exports = { handleMenuSelection };
