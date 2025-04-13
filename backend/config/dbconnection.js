const mongoose = require("mongoose");

exports.dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((err) => {
      console.log("Databse Connection error");
    });
};
