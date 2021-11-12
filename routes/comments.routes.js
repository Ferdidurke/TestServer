const {Router} = require('express')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/comments', async (req, res) => {
    try {
        const { userId, postId, author, body } = req.body

        const comment = new Comment({ userId, postId, author, body })
        await comment.save()

        res.status(201).json({ message: 'Add new comment' })
    } catch (e) {

        res.status(500).json({ message: 'Something wrong' })
    }
})

router.get('/comments/:id', auth, async (req, res) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const comments = await Comment.find({ postId: id })
        res.json(comments)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})


module.exports = router