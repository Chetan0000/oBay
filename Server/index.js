const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/mongoo");
const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
const sellerRouter = require("./routes/sellerRouter");
const productRouter = require("./routes/productRouter");
const cors = require("cors");
const paymentRequest = require("./routes/paymentRouter");
const path = require("path");
dotenv.config();
connectDb();
const app = express();
app.use(express.urlencoded({ extends: true }));
app.use(express.json()); // to accept json data
app.use(cors());
// -----------Routes ----------------
app.use("/", homeRouter);
app.use("/user", userRouter);

// --------- product ROutes --------------
app.use("/product", productRouter);

// ---------Seller routes-----------------
app.use("/seller", sellerRouter);

// -------- razor pay gateway ------------
app.use("/api", paymentRequest);

// -------------- Deployment ---------------
const _dirname1 = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname1, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname1, "client", "build", "index.html"));
  });
} else {
  console.log(`Server is up and running on PORT : ${process.env.PORT} `);
}
// -------------- Deployment ---------------

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(`Error in shooting up the server :${error.message}`);
  }

  console.log(`Server is up and running on PORT : ${process.env.PORT} `);
});

// module.exports = instance;
