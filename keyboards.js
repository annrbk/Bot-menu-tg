const { InlineKeyboard } = require("grammy");
const { getMenu } = require("./services/dishService");

async function getMenuKeyboard(selectedItem, cart) {
  const menuKeyboard = new InlineKeyboard();
  const inCart = cart.some((cartItem) => cartItem.name === selectedItem.name);

  const changeButton = inCart ? "remove from cart ❌" : "add to cart 🛒";

  if (selectedItem) {
    menuKeyboard
      .text(changeButton, "toggle_button")
      .text("view order 📋", "view_order")
      .row();
  }

  const menuItems = await getMenu();

  menuItems.forEach((dish, index) => {
    menuKeyboard.text(dish.name, dish.callback);
    if (index % 2 === 1) menuKeyboard.row();
  });
  return menuKeyboard;
}

const backKeyboard = new InlineKeyboard().text(
  "⬅️  back to menu",
  "back_to_menu"
);

module.exports = { getMenuKeyboard, backKeyboard };
