const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DB CONNECT
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cmhhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function paginationPosts() {
    try {
        await client.connect();
        const database = client.db("postsForPagination");
        const postsCollection = database.collection('pagiPosts');
        /* const posts = {
            title: "Test post title"
        }
        const result = await postsCollection.insertOne(posts);
        console.log(`data inserted _id: ${result.insertedId}`)*/
        // GET API 
        /* app.get('/posts', async (req, res) => {
            const cursor = postsCollection.find({});
            console.log(req.query);
            const page = req.query.page;
            console.log(page)
            const size = parseInt(req.query.size);
            const count = await cursor.count();
            let postsArray;
            if (page) {
                postsArray = await cursor.skip(page * size).limit(size).toArray();
            } else {
                postsArray = await cursor.toArray();
            }
            res.send({
                count,
                postsArray
            });
        }) */

        app.get('/posts', async (req, res) => {
            const cursor = postsCollection.find({});
            // console.log(req.query);
            const page = req.query.page;
            const size = parseInt(req.query.size);
            const count = await cursor.count();
            let postsArray;
            if (page) {
                postsArray = await cursor.skip(page * size).limit(size).toArray();
            } else {
                postsArray = await cursor.toArray();
            }
            res.send({
                count,
                postsArray
            })
        });


    } finally {
        // await client.close();
    }
}
paginationPosts().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server running for pagination posts')
});

app.listen(port, () => {
    console.log('server running for pagination posts ', port)
});