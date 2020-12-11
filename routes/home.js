var express = require('express')
var router = express.Router()
const {login_verifier} = require('../src/auth')

router.get('/', (req,res) => {
    if (login_verifier) return res.redirect('/login')

    res.render('pages/index', {
        path: 'index',
        page: 'Home'
    })
})

module.exports = router