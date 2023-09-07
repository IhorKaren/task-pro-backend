const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");

    const interval = 600000;
    setInterval(() => {
      http
        .get("https://task-pro-covc.onrender.com/", (res) => {})
        .on("error", (err) => {
          console.error(err.message);
        });
    }, interval);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
