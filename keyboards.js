const { InlineKeyboard } = require("grammy");

const menuKeyboard = new InlineKeyboard()
  .text("add to cart 🛒", "add to cart 🛒")
  .text("view order 📋", "view order 📋")
  .row()
  .text("an omelet ", "an omelet ")
  .text("a shakshuka", "a shakshuka")
  .row()
  .text("syrniki ", "syrniki ")
  .text("a semolina porridge", "a semolina porridge")
  .row()
  .text("an oatmeal", "an oatmeal")
  .text("boiled eggs", "boiled eggs")
  .row()
  .text("a sandwich ", "a sandwich")
  .text("a tea", "a tea")
  .row()
  .text("a coffee", "a coffee");

module.exports = { menuKeyboard };
