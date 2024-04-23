require("dotenv").config();

const mongoose = require("mongoose");
try {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((err) => console.log(err));
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

const app = require("../app");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});