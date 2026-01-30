const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // force public DNS for SRV lookup


const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());  


const Article = require('./models/Article');

// Connect to the database and start the server
mongoose.connect('mongodb+srv://ahmed_mostafa:ahmed369@cluster1.p98ssqj.mongodb.net/?appName=Cluster1')
  .then(() => {
    console.log('Successfully connected to MongoDB...')
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));


// Retrieve the resource
app.get('/data', (req, res) => {
    res.send("Here is your data");
});

// Create a new resource
app.post('/data', (req, res) => {
    res.json({ received: true });
}); 

// Replace the entire resource
app.put('/update', (req, res) => {
    res.json({ updated: true });
});

// Update part of the resource
app.patch('/modify', (req, res) => {
    res.json({ modified: true });
});

// Delete the resource
app.delete('/remove', (req, res) => {
    res.json({ removed: true });
});



// Route with URL parameters (/findSum/5/3)
app.get('/findSum/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`);
});

// Route with query parameters (/findDifference?a=5&b=3)
app.get('/findDifference', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Invalid query parameters.');
    }

    const difference = a - b;
    res.send(`The difference of ${a} and ${b} is ${difference}`);
});

// Route with body parameters (send JSON body: { "x": 5, "y": 3 })
app.post('/multiply', (req, res) => {
    const { x, y } = req.body;
    const product = x * y;
    res.send(`The product of ${x} and ${y} is ${product}`);
});


// Serve static HTML files
app.get('/numbers', (req, res) => {
    // res.sendFile(__dirname + '/views/numbers.html');

    // using EJS templat engine
    // it will look for views folder by default
    res.render('numbers.ejs', {
        numbers: [1, 2, 3, 4, 5]
    });
});




// route to create a new article
app.post('/articles', async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const newArticle = new Article({
            title,
            content,
            author
        });

        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// route to get all articles
app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        // res.json(articles);
        res.render('articles.ejs', { articles });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
});

// rouut e to get an article by ID
app.get('/articles/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});











// cluster1 information
// username: ahmed_mostafa
// password: ahmed369
// connection string: mongodb+srv://ahmed_mostafa:ahmed369@cluster1.p98ssqj.mongodb.net/?appName=Cluster1
