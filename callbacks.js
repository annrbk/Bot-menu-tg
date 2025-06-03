async function handleMenuSelection(ctx) {
  const item = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();

  if (item !== "add to cart 🛒" && item !== "view order 📋") {
    if (!ctx.session.cart) ctx.session.cart = [];
    ctx.session.selectedItem = item;
    await ctx.reply(`You have chosen ${item}`);
  }

  if (item === "add to cart 🛒") {
    const selectedItem = ctx.session.selectedItem;
    if (selectedItem) {
      ctx.session.cart.push(selectedItem);
      await ctx.reply(`You added to cart
 ${selectedItem}`);
    } else {
      await ctx.reply("Select a dish before adding to cart");
    }
  }

  if (item === "view order 📋") {
    const cart = ctx.session.cart;
    if (cart && cart.length > 0) {
      await ctx.reply(`Your order:\n- ${cart.join("\n-")}`);
    } else {
      await ctx.reply("Your cart is empty");
    }
  }
}

module.exports = { handleMenuSelection };
