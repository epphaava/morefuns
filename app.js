const express = require('express');
const pool = require('./database');


const app = express();

//register view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.listen(3000);

// public/css to static
app.use(express.static('public/css'));
app.use(express.static('public/assets'));


app.get('/', async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts"
        );
        console.log(posts.rows);
        res.render('index', { title: 'Home', posts: posts.rows });

    } catch (err) {
        console.error(err.message);
    }

});



app.get('/singlepost/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        //console.log("get a post request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [id]
        );
        //console.log(posts.rows[0])
        //console.log(posts.rows);
        res.render('singlepost', { title: 'Post', posts: posts.rows[0] });

        //res.json(posts.rows[0]);
    } catch (err) {
        console.error(err.message);

    }
});


app.get('/addnewpost', (req, res) => {
    res.render('addnewpost', { title: 'Create new post' });
});


app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});