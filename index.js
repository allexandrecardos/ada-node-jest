require('dotenv').config()
const mongoose = require('mongoose')

const server = require('./src/app')

const PORT = process.env.PORT

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_DB_URL,{
    bufferCommands: false,
})
    .then(() => {
        console.log(`Mongo DB connected:::${mongoose.connection.name}`)
        server.listen(PORT, () => console.log(`App listening on PORT:::${PORT}`))
    });
