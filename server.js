const express = require('express')
const MongoClient = require('mongodb').MongoClient
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const { ObjectId } = require('mongodb')
const app = express()
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'blog-list'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`connected to database ${dbName}`)
        db = client.db(dbName)
        const sportsBlog = db.collection('blog-items')

        app.get('/', (req,res) => {
            const cursor = db.collection('blog-items').find().toArray()
            .then(result => {
                console.log(result)
                res.render('index.ejs', {articles: result})
            })
        })

        app.get('/read/:id', (req,res) => {
            console.log(req.params.id)
            db.collection('blog-items').findOne({_id: new ObjectId(req.params.id)})
            .then(result => {
                console.log(result)
                res.render('art.ejs', {art: result})
            })
        })
        app.get('/edit/:id', (req,res) => {
            console.log(req.params.id)
            db.collection('blog-items').findOne({_id: new ObjectId(req.params.id)})
            .then(result => {
                console.log(result)
                res.render('edit.ejs', {art: result})
            })
        })


        app.put('/edit/editArticle', (req,res) => {
            console.log(req.body)
            db.collection('blog-items').updateOne({title: req.body.titleC, postDescription: req.body.desC, markdown: req.body.markdownC}, {
                $set: {
                    title: req.body.title,
                    postDescription: req.body.des,
                    markdown: req.body.markdown,
                }
            }, {
                sort: {_id: -1},
                upsert: false
            })
            .then(result => {
                console.log('updated article')
                res.json('article changed')
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })
        
        app.post('/new-post', (req,res) => {
            console.log(req.body)
            db.collection('blog-items').insertOne({title: req.body.title, datePosted: req.body.date, postDescription: req.body.description, markdown: req.body.markdown})
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
        })


        app.get('/new-article', (req,res) => {
            res.render('form.ejs', {})
        })
        
        app.delete('/deleteArt', (req, res) => {
            console.log(req.body)
            db.collection('blog-items').deleteOne({title: req.body.titleS})
            .then(result => {
                console.log('Stroy Deleted')
                res.json('Player Deleted')
            })
            .catch(error => console.error(error))
        
        })
        app.delete('/read/deleteArt', (req, res) => {
            console.log(req.body)
            db.collection('blog-items').deleteOne({title: req.body.titleS})
            .then(result => {
                console.log('Stroy Deleted')
                res.json('Player Deleted')
            })
            .catch(error => console.error(error))
        
        })

    })
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running on ${process.env.PORT || 5000}`)
    })