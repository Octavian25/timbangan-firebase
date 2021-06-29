var express = require("express");

var app = express();
var http = require("http").Server(app);
var server = http.listen(4000, "0.0.0.0", () => {
  console.log("Listening to requests on port 4000...");
  console.log("===============================================");
  console.log("Timbangan anda sedang terkoneksi ke server");
  console.log("Tekan CTRL + C untuk memutus koneksi");
  console.log("===============================================");
});

var io = require("socket.io")(server);
var COM = process.argv[2];
app.use(express.static("public"));

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort(COM, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
parser.on("data", (temp) => {
  var today = new Date();
  io.sockets.emit("temp", {
    date:
      today.getDate() + "-" + today.getMonth() + 1 + "-" + today.getFullYear(),
    time: today.getHours() + ":" + today.getMinutes(),
    temp: temp,
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

io.on("connection", (socket) => {
  console.log("Mengirim Data Dari Timbangan ke Server");
});
