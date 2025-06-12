const { getMenuKeyboard } = require("../keyboards");

async function addToCart(ctx) {
  const selectedItem = ctx.session.selectedItem;

  if (!selectedItem) {
    await ctx.answerCallbackQuery("Select a dish");
  }

  const cartItemIndex = ctx.session.cart.findIndex(
    (item) => item.name === selectedItem.name
  );

  if (cartItemIndex > -1) {
    ctx.session.cart.splice(cartItemIndex, 1);
    await ctx.answerCallbackQuery({
      text: "Remove from cart",
      show_alert: false,
    });
    await ctx.api.editMessageCaption(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        caption: `You removed: ${selectedItem.name}`,
        reply_markup: getMenuKeyboard(
          ctx.session.selectedItem,
          ctx.session.cart
        ),
      }
    );
  } else {
    ctx.session.cart = [...ctx.session.cart, selectedItem];
    await ctx.answerCallbackQuery({
      text: "Added to cart",
      show_alert: false,
    });
    await ctx.api.editMessageCaption(
      ctx.session.chat_id,
      ctx.session.message_id,
      {
        caption: `You have chosen: ${selectedItem.name}\nPrice: ${selectedItem.price}💋`,
        reply_markup: getMenuKeyboard(
          ctx.session.selectedItem,
          ctx.session.cart
        ),
      }
    );
  }
}

module.exports = { addToCart };
