const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// ROUTERS
const userRoute = require('./src/routes/user.routes');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user', userRoute);


const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on PORT : ${port}`)
});
