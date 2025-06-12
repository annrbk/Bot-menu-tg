const { InlineKeyboard } = require("grammy");

const menuItems = [
  { item: "an omelet", callback: "an omelet" },
  { item: "a shakshuka", callback: "a shakshuka" },
  { item: "syrniki", callback: "syrniki" },
  { item: "a semolina porridge", callback: "a semolina porridge" },
  { item: "an oatmeal", callback: "an oatmeal" },
  { item: "boiled eggs", callback: "boiled eggs" },
  { item: "a sandwich", callback: "a sandwich" },
  { item: "a tea", callback: "a tea" },
  { item: "a coffee", callback: "a coffee" },
];

const getMenuKeyboard = (selectedItem, cart) => {
  const menuKeyboard = new InlineKeyboard();
  const inCart = cart.some((cartItem) => cartItem.name === selectedItem.name);

  const changeButton = inCart ? "remove from cart ❌" : "add to cart 🛒";

  if (selectedItem) {
    menuKeyboard
      .text(changeButton, "toggle_button")
      .text("view order 📋", "view_order")
      .row();
  }

  menuItems.forEach((dish, index) => {
    menuKeyboard.text(dish.item, dish.callback);
    if (index % 2 === 1) menuKeyboard.row();
  });
  return menuKeyboard;
};

const backKeyboard = new InlineKeyboard().text(
  "⬅️  back to menu",
  "back_to_menu"
);

module.exports = { getMenuKeyboard, backKeyboard };
