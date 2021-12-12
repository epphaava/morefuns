const express = require('express');
const pool = require('./database');
const cors = require('cors')


const app = express();

//register view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.listen(3000);

// public/css to static
app.use(express.static('public/css'));
app.use(express.static('public/assets'));
app.use(cors());

app.delete('/singlepost/:id', async (req, res) => {
    console.log('enne proovi')
    try {
        console.log("params:")
        console.log(req.params);
        const id = req.params.id;
        const post = req.body;
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posts WHERE id = $1", [id]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
    }
});

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
        const posts = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [id]
        );

        res.render('singlepost', { title: 'Post', posts: posts.rows[0] });
    } catch (err) {
        console.error(err.message);

    }
});

app.post('/posts', async (req, res) => {
    try {
        const post = req.body;
        post['profile_pic_src'] = 'https://i.ibb.co/qFYpX2L/user.png';
        post['date'] = new Date().toISOString().slice(0, 10);
        console.log(post);
        const newpost = await pool.query(
            "INSERT INTO posts(usr, profile_pic_src, post_pic_src, post_title, date, likes) values ($1, $2, $3, $4, $5, $6) RETURNING*", [post.usr, post.profile_pic_src, post.post_pic_src, post.post_title, post.date, post.likes]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err.message)
    }
});


app.get('/addnewpost', (req, res) => {
    res.render('addnewpost', { title: 'Create new post' });
});


app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});