const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Uncorrectly e-mail').isEmail(),
        check('password', 'Uncorrectly password').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json ({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }

        const { email, password, firstName, lastName } = req.body


        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'User already exist' })
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const  user = new User ({email, password: hashedPassword, firstName, lastName})

        await user.save()

        res.status(201).json({ message: 'New user created' })


    } catch (error) {
        res.status(500).json ({ message: 'ERROR' })
    }
})

router.post(
    '/login',
    [
        check('email', 'Enter correct E-mail').normalizeEmail().isEmail(),
        check('password', 'Enter correct password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json ({
                    errors: errors.array(),
                    message: 'Incorrect username or password'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({ message: 'Incorrect username or password' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect username or password' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        console.log(token)

        res.json({token, userId: user._id, firstName: user.firstName, lastName: user.lastName})



    } catch (error) {
        res.status(500).json ( { message: 'ERROR' })
    }
})


module.exports = router