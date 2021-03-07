const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.static("../library"));

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})

app.get('/users', function (req, res) {
    var sql = "SELECT * FROM users";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.render('users', { title: 'User Data', items: rows })
    })
})

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blobs'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("MYSQL Connected")
})


app.post('/submit', function (req, res) {
    console.log(req.body);

    var sql = "INSERT INTO users VALUES(null, '" + req.body.name + "', '" + req.body.email + "', " + req.body.mobile + ")";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.render('index', { title: 'Data saved', message: 'Data saved successufly' })
    })

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})