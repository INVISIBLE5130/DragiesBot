const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;
const DragiesDrawingsChatId = process.env.DRAGIESDRAWINGSCHATID;
const DragiesWellDoneChatId = process.env.DRAGIESWELLDONECHATID;

const chatId = tag => tag === '#drawings'
    ? DragiesDrawingsChatId
    : tag === '#wellDone'
        ? DragiesWellDoneChatId
        : ''

const botOptions = {
    polling: true
};

const bot = new TelegramBot(TOKEN, botOptions);

bot.on('photo', function ({caption, photo}) {
    if (caption === '#drawings' || caption === '#wellDone') {
        bot.getFile(photo[photo.length - 1].file_id)
            .then((resp) => {
                bot.sendPhoto(chatId(caption), resp.file_id, {}, {})
            })
    }
})

bot.on('polling_error', (error) => {
    console.log(error);
});

bot.on('text', function (msg) {
    let userName = msg.chat.first_name;
    let messageChatId = msg.chat.id;
    let messageText = msg.text;

    let getMarketplaces = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'OpenSea', url: 'https://opensea.io/collection/dragies-band', callback_data: ''}],
                [{text: 'AlphaArt', url: 'https://alpha.art/collection/dragies-band', callback_data: ''}],
                [{text: 'MagicEden', url: 'https://magiceden.io/', callback_data: ''}],
                [{text: 'Solanart', url: 'https://solanart.io/', callback_data: ''}],
                [{text: 'Rarible', url: 'https://rarible.com/', callback_data: ''}]
            ]
        })
    };

    if (msg.text === 'Marketplaces') {
        bot.sendMessage(msg.chat.id, 'Marketplaces:', getMarketplaces);
    }

    let getCreators = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Artist - Iryna', url: 'https://alpha.art/collection/dragies-band', callback_data: ''}],
                [{text: 'Designer - Svitlana', url: 'https://alpha.art/collection/dragies-band', callback_data: ''}],
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

    if (messageText === '/start') {
        bot.sendMessage(messageChatId, `DragiesBot greetings ${userName}! Bot will help you to get the necessary info for you.`, keyboard);
    }
});

setInterval(() => {
    console.log('I`m alive :)')
}, 1200000)