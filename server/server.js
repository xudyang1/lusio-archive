const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }


// TODO: modify this sample later
// sample tests for backend operations
// Instruction Via README.md
const quizRouter = require('./routes/api/quizzes');
const platformRouter = require('./routes/api/platforms');
const authRouter = require('./routes/api/auth');
// use routes
app.use('/api/quizzes', quizRouter);
app.use('/api/platforms', platformRouter);
app.use('/api/auth', authRouter);
// end of test


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));