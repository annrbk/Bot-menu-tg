const { InlineKeyboard } = require("grammy");
const { handleChangeButton } = require("./utils/keyboardUtils");

function mealTypeKeyboard() {
  return new InlineKeyboard()
    .text("breakfast", "BREAKFAST")
    .text("lunch", "LUNCH")
    .text("dinner", "DINNER");
}

async function getMenuKeyboard(
  menuItems,
  selectedItem,
  cart,
  selectedMealType
) {
  const keyboard = new InlineKeyboard();

  menuItems.forEach((dish, index) => {
    keyboard.text(dish.name, dish.callback);
    if (index % 2 === 1) keyboard.row();
  });
  keyboard.row();
  if (selectedItem) {
    handleChangeButton(selectedItem, cart, keyboard, selectedMealType);
  }
  return keyboard;
}

function viewCartKeyboard() {
  return new InlineKeyboard().text("View cart 📋", "view_cart");
}

function backToOrderKeyboard() {
  return new InlineKeyboard().text("⬅️  back to order", "back_to_order");
}

const backKeyboard = new InlineKeyboard().text(
  "⬅️  back to menu",
  "back_to_menu"
);

module.exports = {
  getMenuKeyboard,
  backKeyboard,
  mealTypeKeyboard,
  viewCartKeyboard,
  backToOrderKeyboard,
};
