require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//middler ware

const morgan = require('morgan');

const AuthRouter = require('./routes/auth');
const UserRouter = require('./routes/user');

app.listen(process.env.PORT, () => {
  console.log('Server is up and running');
});

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to DB');
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is up and running',
  });
});

app.use('/api/auth/', AuthRouter);
app.use('/api/user/', UserRouter);
