const mongoose = require('mongoose');
require('dotenv').config()

const mongooseConnect = async () => {
  try {
    mongoose.set('strictQuery', false)

    let connect = mongoose.connect(process.env.MONGO_DB_URL);
    // console.log(connect);
    return connect;

  } catch (e) {
    console.log(e);
  }
}

module.exports = mongooseConnect