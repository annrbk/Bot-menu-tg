const { menuKeyboard } = require("./keyboards");

async function start(ctx) {
  await ctx.reply(`Hi there! 👋 I'm your MenuHub Bot.  
Ready to help you choose something tasty! 🍽️  
Select a command below`);
}

async function menu(ctx) {
  await ctx.reply("Choose what you would like for breakfast?", {
    reply_markup: menuKeyboard,
  });
}

module.exports = { start, menu };
