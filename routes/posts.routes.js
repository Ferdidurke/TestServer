const {Router} = require('express')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/post', async (req, res) => {
    try {
        console.log(req.body)
        const {body, title} = req.body

        const post = new Post({title, body})
        console.log(post)
        await post.save()

        res.status(201).json({ message: 'Добавлен новый пост' })
    } catch (e) {

        res.status(500).json({message: 'Something wrong'})
    }
})

router.get('/ps', auth, async (req, res) => {
    try {
    const posts = await Post.find({userId: req.user.userId})
    res.json(posts)
    } catch (e) {
        res.status(500).json({message: 'Something wrong'})
    }
})

router.get('/ps:id', auth, async (req, res) => {
    try {
    const posts = await Post.findById(req.params.id)
    res.json(posts)
    } catch (e) {
        res.status(500).json({message: 'Something wrong'})
    }
})


module.exports = router