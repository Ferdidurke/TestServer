const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Something wrong'})
    }
})

module.exports = router