const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3001);
sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(err => {
    console.error("데이터베이스 연결 error\r\n", err);
  });
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중", "\r\n http://localhost:3001/ping");
});
