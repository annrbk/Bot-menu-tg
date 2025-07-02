function getNextMealType(currentType) {
  switch (currentType) {
    case "BREAKFAST":
      return "LUNCH";
    case "LUNCH":
      return "DINNER";
    case "DINNER":
      return "CART";
    default:
      return "BREAKFAST";
  }
}

module.exports = { getNextMealType };
