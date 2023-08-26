const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/authRouter");
const feedbackRouter = require("./routes/api/feedbackRouter");
const userRouter = require("./routes/api/userRoute");
const boardRouter = require("./routes/api/boardRouter");
const columnRouter = require("./routes/api/columnsRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/user", userRouter);
app.use("/api/board", boardRouter);
app.use("/api/column", columnRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
