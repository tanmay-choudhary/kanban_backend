const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = "mongodb://127.0.0.1/kanban"; // Use IPv4 loopback address

const app = express();

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const con = mongoose.connection;

con.on("open", () => {
  console.log("Connected to MongoDB...");
});

app.use(express.json());
app.use(cors());
const kanbanRouter = require("./routes/kanban");
const deleteAllRouter = require("./routes/deleteAll"); // Correct path to the router file

app.use("/kanban", kanbanRouter);
app.use("/deleteAll", deleteAllRouter); // Correct mounting point

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
