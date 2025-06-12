export const totalSum = (cart) => {
  return cart.reduce((acc, item) => parseInt(item.price) + acc, 0);
};
