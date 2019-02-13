const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// ROUTERS
const userRoute = require('./src/routes/user.routes');
const questionRoute = require('./src/routes/question.routes');

// DB connection
mongoose.connect('mongodb://localhost:27017/stackoverflow', {useNewUrlParser: true})
    .then(() => console.log('DB Connected'));

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/question', questionRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on PORT : ${port}`)
});
