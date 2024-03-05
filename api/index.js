const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = 3001; // process.env.SERVER_PORT; //Add this
const logsHandler = require('./integration/logsHandler')
const unauthorizedRoute = require('./apiReq/Unauthorized');
const recruiterRoute = require('./apiReq/RecruiterApi')
const userRoute = require('./apiReq/UserApi')
const userValidate = require('./apiReq/Validate')

/**
 * Enable CORS and set up middleware for parsing JSON and cookies.
 */
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://iv1201-vt24-frontend.vercel.app'); // Change '*' to your frontend URL in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, application/json, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  next();
});
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://iv1201-vt24-frontend.vercel.app'); // Change '*' to your frontend URL in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  res.sendStatus(200);
});
app.use(logsHandler.appendReqLineToFile)

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use('/unauthorized', unauthorizedRoute);
app.use('/recruiter', recruiterRoute);
app.use('/user', userRoute);
app.use('/validate', userValidate);

/**
 * Start the server and listen for incoming connections.
 */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});