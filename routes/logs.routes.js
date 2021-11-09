const {Router} = require('express')
const Log = require('../models/Logs')

const router = Router()

router.post('/', async (req, res) => {
    try {
        const { body } = req.body
        const log = new Log({ body })
        await log.save()
        console.log(log)
        res.status(201).json({message: 'Add new log'})
    } catch (e) {

        res.status(500).json({message: 'Something wrong'})
    }
})

// router.get('/comments', auth, async (req, res) => {
//     try {
//         const comments = await Comment.find()
//         res.json(comments)
//     } catch (e) {
//         res.status(500).json({message: 'Something wrong'})
//     }
// })


module.exports = router