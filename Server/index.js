const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/mongoo");
const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
const sellerRouter = require("./routes/sellerRouter");

dotenv.config();
connectDb();
const app = express();
app.use(express.urlencoded());
app.use(express.json()); // to accept json data

// Routes
app.use("/", homeRouter);
app.use("/user", userRouter);

// Seller routes
app.use("/seller", sellerRouter);

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error in shooting up the server :${error.message}`);
  }

  console.log(`Server is up and running on PORT : ${PORT}`);
});
