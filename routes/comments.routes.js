const {Router} = require('express')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/comments', async (req, res) => {
    try {
        console.log(req.body)
        const {userId, author, body} = req.body

        const comment = new Comment({userId, author, body})
        console.log(comment)
        await comment.save()

        res.status(201).json({ message: 'Добавлен новый комментарий' })
    } catch (e) {

        res.status(500).json({message: 'Something wrong'})
    }
})

router.get('/comments', auth, async (req, res) => {
    try {
        const comments = await Comment.find()
        console.log(comments)
        res.json(comments)
    } catch (e) {
        res.status(500).json({message: 'Something wrong'})
    }
})


module.exports = router