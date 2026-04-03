const mongoose = require('mongoose');

async function connectMongoDB(url) {
    return mongoose.connect(url)
    .then(() => console.log("Mongo Connected"))
}

module.exports = {
    connectMongoDB,
}