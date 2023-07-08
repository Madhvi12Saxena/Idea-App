const express = require('express');
const mongoose = require('mongoose')
const serverConfig = require('./configs/server.config.js')
const dbConfig = require('./configs/db.config.js');
// const { init } = require('./models/user.model.js');
const userModel = require('./models/user.model.js');


const app = express();

/**
 * Logic to connect Mongodb and Create an ADMIN user
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to db");
});

db.once("open", () => {
    console.log("DB is connected");

    init();
})

async function init() {

    /**
     * Check if the admin user is already present
     */
    let admin = await userModel.findOne({
        userId: "admin"
    });

    if(admin) {
        console.log("Admin user already present");
        return;
    }
    
    admin = await userModel.create( {
        name: "Madhvi Saxena",
        userId: "admin",
        email: "ssms122005@gmail.com",
        userType: "ADMIN",
        password: "Welcome1"
    })
    console.log(admin);
}

app.listen(serverConfig.PORT, () => {
    console.log("server started");
}) 
