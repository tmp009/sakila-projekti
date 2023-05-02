const {host, port} = require("./config.json")
const { getMovieByCategory, getMovie, getMovieById, searchMovie } = require('./tietovarasto.js')
const path = require("path")

const express = require("express");
let app = express();


app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home", {});
});

app.get("/videot", async (req, res) => {
    try {
        let page = req.query.page;
        const category = req.query.category;
        const term = req.query.term
        
        if (typeof page === 'undefined') page = 0;
        
        if (typeof term !== 'undefined') {
            if (typeof category !== 'undefined') {
                res.render("videos", {videos:await searchMovie(Number(page) * 10, term, category)})
            } else {
                res.render("videos", {videos:await searchMovie(Number(page) * 10, term)})
            }
            return
        }

        if (typeof category === 'undefined') {
            res.render("videos", {videos:await getMovie(Number(page) * 10)});
        }
        else {
            res.render("videos", {videos:await getMovieByCategory(category, Number(page) * 10)});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/videot/:id', async (req,res)=>{
    try {
        let id = req.params.id;

        // if (typeof id === 'undefined') throw new Error('');
        const video = await getMovieById(+id)

        if (!video.length) res.status(404).send('Ei löytyy');
        else{
            res.render('info', {video:video[0]})
        }


    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.listen(port, host, ()=>{
    console.log(`Listening on http://${host}:${port}`)
})