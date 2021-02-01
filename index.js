// const { Telegraf } = require('telegraf')
const { Composer } = require('micro-bot')
const https = require("https");

require('dotenv').config();

// const bot = new Telegraf(process.env.BOT_TOKEN)
const bot = new Composer

// start command for our bot
bot.start((ctx) => ctx.reply(`Welcome ${ctx.message.from.first_name} ! nice to see you`));
//help command for our bot
bot.help((ctx) => ctx.reply(`
    Hi! I can perform this following operations :-
    /start
    /help
    /welcome
    /weather place_name
    /author

    #srcf
`));


//author command to see the author of this bot
bot.command('author', (ctx) => {
    ctx.reply(`
        Snehasish Dhar is the author of this bot .
        Feel free to contact him :
        github: https://github.com/dsnehasish74
        linkedin: https://www.linkedin.com/in/snehasish-dhar-b657721a0/
        portfolio: https://dsnehasish.netlify.app/
    `);
});



//welcome command to welcome the bot
bot.command(['welcome','hlw','hello','hi','hii','hiii'], (ctx) => {
    ctx.reply(`
       Nice to see you !! ${ctx.message.from.first_name} ! regards from #srcf ! 
    `);
});




//comand to check the Weather of any place

bot.command('weather', (ctx) => {

    //taking input of the place name
    let place = ctx.message.text.split(' ')[1];
    //api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.WEATHER_TOKEN}&units=metric`; 
    https.get(url,function(res){
        //error handling 
        if(res.statusCode!=200){
            ctx.reply("Sorry!! Something wrong please check your spelling or try again");
        }else{
            res.on("data",function(data){
                data = JSON.parse(data);
                let des=data.weather[0].description;
                let temp=data.main.temp;
                let flike=data.main.feels_like;
                let min_temp=data.main.temp_min;
                let max_temp=data.main.temp_max;
                let humidity=data.main.humidity;
                ctx.telegram.sendMessage(ctx.chat.id,
                `<b>${place} \t:</b>{
                <b>${des}</b>
                <b>Temperature</b>:${temp}
                <b>Feels like</b>: ${flike}
                <b>Minimum Temperature</b> : ${min_temp}
                <b>Maximum Temperature</b> : ${max_temp}
                <b>Humidity</b> : ${humidity}
                }
                -------regards from #srcf
                `,{parse_mode: "HTML"});
            })
        }
    })

});


module.exports = bot

// bot.launch()