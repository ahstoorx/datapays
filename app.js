const express = require('express');
const { ConnectDB } = require('./bd/connexion');
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {paysRouter} = require('./routes/paysRoute')
const { DepRouter } = require('./routes/departementRoute');
const { ComRouter } = require('./routes/communeRoute');


dotenv.config();

const app = express()
 const port = process.env.PORT || 5000;
 
ConnectDB()//connexion à la base de données

// middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use(process.env.HOST + '/countriesinfo', paysRouter);
app.use(process.env.HOST + '/countriesinfo', DepRouter);
app.use(process.env.HOST + '/countriesinfo', ComRouter);

app.use((err, req, res, next) => {

    res.json({
        status: err.status,
        message: err.message,
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))