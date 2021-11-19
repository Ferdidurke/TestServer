const {Router} = require('express')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.post('/posts', auth, async (req, res) => {
    try {

        const { userId, author, body, title } = req.body
        const post = new Post({ userId, author, title, body })
        await post.save()
        res.status(201).json({ message: 'Add new post' })
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})

router.get('/posts', async (req, res) => {
    try {
        console.log(req.query)
        const postsLength = await Post.count()
        const sortType = JSON.parse(req.query.sort)
        const posts = await Post.find().limit(Number(req.query.limit)).skip(Number(req.query.skip)).sort(sortType)
        res.json({ posts, counter: postsLength })

    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})

router.delete('/posts', auth, async (req, res) => {
    try {
        const { _id } = req.body
        console.log(req.body)
        Post.deleteOne({ _id: _id }, function (err, data) {
            if (err) {
                console.log (err.message);
            }
        })
        res.json({ success: _id })
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})





router.get('/posts/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        res.json(posts)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})


module.exports = router