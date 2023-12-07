const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 8080;
const app = express();

const { mongoConnect } = require('./services/mongo');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');


app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);



async function startServer() {
    await mongoConnect();

    const server = app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });     
}

startServer();


