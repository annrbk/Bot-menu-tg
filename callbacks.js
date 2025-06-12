const { addToCart } = require("./handlers/addToCart");
const { chooseItem } = require("./handlers/chooseItem");
const { menuItems } = require("./menu");

async function handleMenuSelection(ctx) {
  const item = ctx.callbackQuery.data;

  if (menuItems.some((menuItem) => menuItem.name === item)) {
    return chooseItem(ctx, item);
  }

  if (item === "toggle_button") return addToCart(ctx);
}

module.exports = { handleMenuSelection };
