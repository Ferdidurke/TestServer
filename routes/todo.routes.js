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

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const patch = req.body
        console.log(id)
        console.log(patch)
        const task = await Task.findByIdAndUpdate(id, patch)
        task.save()
        res.status(201).json({ message: 'Задача обновлена' })
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

router.delete('/', auth, async (req, res) => {
    try {
        const { id } = req.body

        Task.deleteOne({ _id: id }, function (err, data) {
            if (err) {
                console.log (err.message);
            }
        })
        res.json({ success: id })
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})



module.exports = router