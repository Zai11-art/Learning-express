const express = require('express');
const path = require('path')
const app = express();
const redditData = require('./data.json')
// console.log(redditData)

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req,res) => {
    res.render('home')
})

app.get('/cats', (req,res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', {cats})
})

// for (let cat of cats) {
//     console.log(cat);
// }

app.get('/r/:subreddit', (req,res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    // console.log(data)
    if (data) {
        res.render(`subreddit`, {...data})
    } else {
        res.render(`notfound`, { subreddit })
    }
     
})

app.get('/random', (req,res) => {
    const randNum = Math.floor(Math.random()*10) + 1
    res.render('random', {rand: randNum})
})

app.listen(3000, (req,res) =>  {
    console.log('listening on route')
})

