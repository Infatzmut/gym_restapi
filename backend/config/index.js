const dotenv = require('dotenv');

if(process.env.NODE_ENV !== "production") {
    dotenv.config();
}

module.exports = {
    BASE_URL : process.env.BASE_URL
}