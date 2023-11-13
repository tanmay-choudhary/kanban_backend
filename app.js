const express = require("express");
const mongoose = require("mongoose");

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

const kanbanRouter = require("./routes/kanban");
app.use("/kanban", kanbanRouter);

app.listen(8080, () => {
  console.log("Server started on port 9000");
});
