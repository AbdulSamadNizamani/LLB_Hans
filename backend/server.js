// import app from "./index.js";
// import colors from 'colors';
// import Connect from "./db/Connect.js";
const app = require("./index.js");
const colors = require("colors");
const Connect = require("./db/Connect.js");

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.listen(process.env.PORT, async () => {
  await Connect();
  console.log(`My app is running on ${process.env.PORT}`.yellow);
});