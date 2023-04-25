const {host, port} = require("./config.json")
const { getMovieByCategory, getMovie } = require('./tietovarasto.js')
const path = require("path")

const express = require("express");
let app = express();


app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home", {});
});

app.get("/videot", (req, res) => {
    res.render("videos", {});
});


app.get('/api/videot', async (req, res)=>{
    try {
        let page = req.query.page;
        let category = req.query.category;

        if (typeof page === 'undefined') page = 0;

        if (typeof category === 'undefined') {
            res.json(await getMovie(Number(page) * 30));
        }
        else {
            res.json(await getMovieByCategory(category, Number(page) * 30));
        }

    } catch (error) {
        res.status(400).send(error.message);
    }

})

app.listen(port, host, ()=>{
    console.log(`Listening on http://${host}:${port}`)
})