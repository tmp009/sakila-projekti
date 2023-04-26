let dbconfig = require("./dbconfig.json")
let mysql = require("mysql")

function getMovieByCategory(category, page) {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        con.connect();

        con.query(`select f.film_id, 
        f.title, 
        c.name as category,
        description,
        f.replacement_cost as price
        from film as f, film_category as fc 
        left outer join category as c on c.category_id = fc.category_id
        where fc.film_id=f.film_id and upper(c.name)=upper(?)
        order by f.title ASC
        limit 10
        offset ?;`, [category, page], (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows);
        })
    
    })
}

function getMovie(page) {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        con.connect();

        con.query(`select f.film_id, 
        f.title, 
        c.name as category,
        description,
        f.replacement_cost as price
        from film as f, film_category as fc 
        left outer join category as c on c.category_id = fc.category_id
        where fc.film_id=f.film_id
        order by f.title ASC
        limit 10
        offset ?;`, [page], (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows);
        });
    })
}

function getMovieById(id) {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        con.connect();

        con.query(`
        select 
            f.film_id, 
            f.title, 
            c.name as category,
            description,
            f.replacement_cost as price,
            release_year as year,
            lang.name
        from 
            film as f, 
            film_category as fc, 
            language as lang, 
            category as c
        where 
            f.film_id=? and lang.language_id=f.language_id and c.category_id=fc.category_id
        limit 1`, id, (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows);
        });
    })
}
module.exports = {getMovieByCategory, getMovie, getMovieById}