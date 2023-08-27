const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/authRouter");
const feedbackRouter = require("./routes/api/feedbackRouter");
const userRouter = require("./routes/api/userRouter");
const boardRouter = require("./routes/api/boardRouter");
const columnRouter = require("./routes/api/columnsRouter");
const cardRoute = require("./routes/api/cardsRoute");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/feedback", feedbackRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/column", columnRouter);
app.use("/card", cardRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(err);
  res.status(status).json({ message });
});

module.exports = app;
