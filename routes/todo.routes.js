const {Router} = require('express')
const Task = require('../models/Task')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const { userId, taskText, deadlineDate, createDate, isChecked, deadlineColor, isMarkToDelete, deletedDate } = req.body

        const task = new Task({ userId, taskText, deadlineDate, createDate, isChecked, deadlineColor, isMarkToDelete, deletedDate })
        await task.save()

        res.status(201).json({ message: 'Добавленa новая задача' })
    } catch (e) {

        res.status(500).json({message: 'Something wrong'})
    }
})

router.patch('/', async (req, res) => {
    try {
        const { id } = req.body

        const task = Task.findById(id)

        res.status(201).json({ message: 'Задача удалена' })
    } catch (e) {

        res.status(500).json({message: 'Something wrong'})
    }
})



router.get('/', auth, async (req, res) => {
    try {
        const sortType = JSON.parse(req.query.sort)
        const tasks = await Task.find().sort(sortType)
        res.json(tasks)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})


module.exports = router