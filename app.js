const express = require('express');

const app = express();

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

// public/css to static
app.use(express.static('public/css'));
app.use(express.static('public/assets'));



app.get('/', (req, res) => {

    const posts = [
        {
            user: "Juku",
            date: "18.01.2021",
            profile_pic_src: "./user.png",
            post_pic_src: "./moon.jpg",
            post_title: "lähen kooli !",
            likes: 0
        },
        {
            user: "Juku",
            date: "17.01.2021",
            profile_pic_src: "./user.png",
            post_pic_src: "./yoda.jpeg",
            post_title: "lähen kooli !",
            likes: 0
        }, 
        {
            user: "Aadu",
            date: "16.01.2021",
            profile_pic_src: "./user.png",
            post_pic_src: "./news.jpg",
            post_title: "oi kui põnev!",
            likes: 0
        }
    ]
    res.render('index', {title: 'Home', posts});
});

app.get('/singlepost', (req, res) => {
    res.render('singlepost', {title: 'Post'});
});

app.get('/addnewpost', (req, res) => {
    res.render('addnewpost', {title: 'Create new post'});
});


app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
});