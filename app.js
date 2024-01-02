const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authenticateMiddleware');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');


const PORT = process.env.PORT || 8081;
const app = express();


const { mongoConnect } = require('./services/mongo');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.get('*', checkUser);



async function startServer() {
    await mongoConnect();

    const server = app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });     
}

startServer();


