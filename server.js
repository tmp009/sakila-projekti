const {host, port} = require("./config.json")
const path = require("path")

const express = require("express");
let app = express();


app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home", {});
})

app.listen(port, host, ()=>{
    console.log(`Listening on http://${host}:${port}`)
})