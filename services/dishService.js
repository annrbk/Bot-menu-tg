const { prisma } = require("../prismaClient");

async function getBreakfastMenu() {
  return await prisma.dish.findMany({
    where: { mealType: "BREAKFAST" },
  });
}

async function getLunchMenu() {
  return await prisma.dish.findMany({
    where: { mealType: "LUNCH" },
  });
}

async function getDinnerMenu() {
  return await prisma.dish.findMany({
    where: { mealType: "DINNER" },
  });
}

async function getMenuByType(mealType) {
  if (mealType === "BREAKFAST") {
    return await getBreakfastMenu();
  } else if (mealType === "LUNCH") {
    return await getLunchMenu();
  } else {
    return await getDinnerMenu();
  }
}

async function getMenu() {
  return await prisma.dish.findMany();
}

module.exports = {
  getBreakfastMenu,
  getLunchMenu,
  getDinnerMenu,
  getMenuByType,
  getMenu,
};
