var express = require('express')
var router = express.Router()

router.get('/', (req,res) => {
    res.render('pages/login', {
        path: 'login',
        page: 'Login'
    })
})

module.exports = router