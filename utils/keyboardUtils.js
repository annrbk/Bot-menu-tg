function handleChangeButton(selectedItem, cart, keyboard) {
  const inCart = cart.some((cartItem) => cartItem.name === selectedItem.name);
  const toggleLabel = inCart ? "remove from cart ❌" : "add to cart 🛒";
  if (selectedItem) {
    keyboard
      .text(toggleLabel, "toggle_button")
      .text("view order 📋", "view_order")
      .row();
  }
  return keyboard;
}

module.exports = { handleChangeButton };
