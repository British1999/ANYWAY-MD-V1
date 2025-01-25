const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9FZ1BVVXB3WFRJRVl4bkEzUGZ5MU1VTGNRRXdyQjhUQ1ppZWw2RngxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOG5YNjFwbDJkRkU0VGFnVWs1WTZXeW9RY21KZC9JWjZTVm9EdldBRGx4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQWpUSkhuQ1hNRjRpTTBWOUFqVnJOOTNPeENIcW9uWWtkUDhCQXJMNUU0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLN2hxUzVhZUt2UnNSem1sRjlYQUw3a25McmVNZVBQVVVUZTcrTmhsaldzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdQTUdKZ3N0bUJjRjNrN0x1YUlVbk1URzZuUzlhTTBlOUEzVStRWVZ4RTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJCUERNRFZxVVFyVS85QWI4TGVqWk1URFUwcEtZcUNaTG96U29aMUM4RXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUdyZHlRWkJGRjIraHR5VkdKcGQrVEFwd0sycVBlckhRREc3eUJRLzlWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFJaaWxkOVcxU2JkZkFRd1BtYW1rTm5hem96KzF5WWt1UE9aQXcvOU1XTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZjQVpKQmczM0hMZ1VGckFYSDNPZWluRXZicm5HN3BTanJMUUtraENQSEx3cTE0c2wxU2tsZ1FqV1ZWN0RFcHFDWStCa1lsbnE5Z1cwemlBUFdBS0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoiUlk1dXJscEVneU4vSXk4dmVZQW5adW1JZTIwTStpdkd4cGFtcWZMeXR5RT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUllFdHFPeTJTS21zNXRYRDJ1ajF2USIsInBob25lSWQiOiJkNTYyNmFlOC1lMGQxLTQ1OTAtYWFiNC05MTk5YjcxYjYwOGUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWszbVVETk50RTlVaEYzR09Kd2dVSDA5S0JnPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdqTWxIYlZ1L0U3eVRMd25HdWFYbjc4a1F1QT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJXQU0zNERXUyIsIm1lIjp7ImlkIjoiMjMzNTcwNTMyOTEzOjI4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkZyZWViaWVzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJdUcrekFRNW9IU3ZBWVlCeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXYzYveVI2K2ZNNHE3czZvUnE4ZjVmUThxWGRmS3AxMERVODlxKzRuUGd3PSIsImFjY291bnRTaWduYXR1cmUiOiJPMzRzd0NZWkw2d216MnRJUU9sa2w3YU9KS2JIaWR1QVdzZmVlL242cnR5YVhjclJiYXRqbFZ0cW1jOXNoT1ArZkcwenc5ckVxSUJBQjNFYzNaRGpDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWGtjNWlpYlExbHlXN0gwQ1NNZmUxVUFHd0NHUWxDcUJFcGJOSWhXanQwTDJkZU02MXF4QUkzdVRadzN5cmhpUkduRTQ2NEJ6cnFLRkszTDFtT2pwQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NzA1MzI5MTM6MjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVm5PdjhrZXZuek9LdTdPcUVhdkgrWDBQS2wzWHlxZGRBMVBQYXZ1Sno0TSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNzc4NTU4NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPSnkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
