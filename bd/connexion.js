const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log("monogDB connected successfully");
    } catch (error) {
        console.log(error);
    }
};

// mongoose.connection.on('disconnected',()=>{
//     console.log('We are now disconnected on your database')
// })

// mongoose.connection.on('connected',()=>{
//     console.log('We are now connected on your database')
// })


module.exports.ConnectDB = connectDB;