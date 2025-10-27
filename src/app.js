require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


const log = require("./middleware/log");
app.use(log);


const carRouter = require('./routes/carRoutes');
app.use('/cars', carRouter);

const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);


const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
