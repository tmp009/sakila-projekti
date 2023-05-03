let dbconfig = require("./dbconfig.json")
let mysql = require("mysql")
const sqlQuery = require('./sql.json')

function getMovieByCategory(category, page) {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        con.connect();

        con.query(sqlQuery.getMovieByCategory.join(' '), [category, page], (err, rows, cols) => {
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

        con.query(sqlQuery.getMovie.join(' '), [page], (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows);
        });
    });
}

function getMovieById(id) {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        con.connect();

        con.query(sqlQuery.getMovieById.join(' '), id, (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows);
        });
    })
}

function searchMovie(page, term, category='') {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        let likeString;

        if (term.length > 2) {
            likeString = '%' + term + '%';
        } else {
            likeString = ''
        }
        
        con.connect();

        con.query(sqlQuery.searchMovie.join(' '), [likeString, likeString, category, category, page], (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows);
        });
    });
}

function getMovieCount(category) {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        let query;
        con.connect();

        if (typeof category === 'string') query = sqlQuery.moveCountCategory.join(' ');
        else {
            query = sqlQuery.movieCount.join(' ');
        }

        con.query(query, category, (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows[0].entries);
        })
    })
}

function getMovieCountSearch(term, category='') {
    return new Promise((resolve, reject)=> {
        let con = mysql.createConnection(dbconfig);
        con.connect();

        let likeString;

        if (term.length >= 3) {
            likeString = '%' + term + '%';
        } else {
            likeString = ''
        }

        con.query(sqlQuery.moveCountSearch.join(' '), [likeString, likeString, category, category], (err, rows, cols) => {
            if (err) {
                reject(err.message)
            }

            con.end();
            resolve(rows[0].entries);
        })
    })
}

module.exports = {getMovieByCategory, getMovie, getMovieById,
                searchMovie, getMovieCount, getMovieCountSearch
                };