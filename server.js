const {host, port} = require("./config.json")
const { getMovieByCategory, getMovie, getMovieById, 
        searchMovie, getMovieCount, getMovieCountSearch } = require('./tietovarasto.js')
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
        let page = Number(req.query.page);
        let videos;
        let count;
        const category = req.query.category;
        const term = req.query.term
        
        if (!page) page = 0;
        else { page = page - 1 }
        
        const offset = page*10;

        if (typeof term !== 'undefined') {
            videos = await searchMovie(offset, term, category);
            count = await getMovieCountSearch(term, category);
        } else if (typeof category !== 'undefined') {
            videos = await getMovieByCategory(category, offset);
            count = await getMovieCount(category);
        } else {
            videos = await getMovie(offset);
            count = await getMovieCount(category);
        }

        res.render("videos", {videos:videos,
                count:count,
                page:page});

    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
});

app.get('/videot/:id', async (req,res)=>{
    try {
        let id = req.params.id;

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