const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv').config();
if (dotenv.error) {
    throw dotenv.error
}
const TOKEN = process.env.TOKEN;

const botOptions = {
    polling: true
};

const bot = new TelegramBot(TOKEN, botOptions);

bot.on('text', function(msg) {
    let userName = msg.chat.first_name;
    let messageChatId = msg.chat.id;
    let messageText = msg.text;

    let getMarketplaces = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'AlphaArt', url: 'https://alpha.art/collection/dragies-band', callback_data: '' }],
                [{ text: 'Solanart', url: 'https://solanart.io/', callback_data: '' }],
                [{ text: 'Rarible', url: 'https://rarible.com/', callback_data: '' }]
            ]
        })
    };

    if (msg.text === 'Marketplaces') {
        bot.sendMessage(msg.chat.id, 'Marketplaces:', getMarketplaces);
    }

    let getCreators = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Designer - Svitlana', url: 'https://alpha.art/collection/dragies-band', callback_data: ''}],
                [{text: 'Artist - Iryna', url: 'https://alpha.art/collection/dragies-band', callback_data: ''}],
                [{text: 'Developer - Ihor', url: 'https://alpha.art/collection/dragies-band', callback_data: ''}],
            ]
        })
    };

    if (msg.text === 'About') {
        bot.sendMessage(msg.chat.id, 'Hi! Description will be added ASAP :)', getCreators);
    }

    let keyboard = {
        reply_markup: JSON.stringify({
            keyboard: [
                ['About'],
                ['Marketplaces']
            ]
        })
    };

    if (messageText === '/start' ) {
        bot.sendMessage(messageChatId, `DragiesBot greetings ${userName}! Bot will help you to get the necessary info for you.`, keyboard);
    }

    if (messageText === '/about') {
        bot.sendMessage(messageChatId, `Hi! Description will be added ASAP :)`)
    }
});