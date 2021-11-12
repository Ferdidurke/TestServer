const {Router} = require('express')
const Task = require('../models/Task')
const Log = require('../models/Logs')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/', async (req, res) => {
    try {
        const { userId, taskText, deadlineDate, createDate, isChecked, deadlineColor, isMarkToDelete, deletedDate } = req.body

        const task = new Task({ userId, taskText, deadlineDate, createDate, isChecked, deadlineColor, isMarkToDelete, deletedDate })
        await task.save()

        res.status(201).json({ message: 'Add new task' })
    } catch (e) {

        res.status(500).json({message: 'Something wrong'})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const patch = req.body
        const task = await Task.findByIdAndUpdate(id, patch)
        task.save()
        res.status(201).json({ message: 'Task has been successfully changed' })
    } catch (e) {

        res.status(500).json({ message: 'Something wrong' })
    }
})

router.patch('/', async (req, res) => {
    try {
        const patch = req.body.update
         for (const item of patch) {
            const task = await Task.findByIdAndUpdate(item.id, { deadlineColor: item.deadlineColor} )
            task.save()
        }
        res.status(201).json({ message: 'Task has been successfully changed' })
    } catch (e) {

        res.status(500).json({message: 'Something wrong'})
    }
})




router.get('/', auth, async (req, res) => {
    try {
        const sortType = JSON.parse(req.query.sort)
        const { userId } = JSON.parse(req.query.filter)
        const undoneTasks = await Task.find({ userId : userId, isChecked : false, isMarkToDelete : false }).sort(sortType)
        const doneTasks = await Task.find({ userId : userId, isChecked : true, isMarkToDelete : false })
        const deletedTasks = await Task.find( { userId: userId, isMarkToDelete: true } ).sort( { deletedDate: '-1'} )
        const tasks = undoneTasks.concat(doneTasks, deletedTasks)
        res.json(tasks)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})


router.get('/download/tasks', auth, async (req, res) => {
    try {
        const { userId } = req.query
        const file = await Task.find( { userId: userId } )
        res.json(file)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong' })
    }
})

router.get('/download/logs', auth, async (req, res) => {
    try {

        const file = await Log.find( )
        res.json(file)
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