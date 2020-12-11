var express = require('express')
var router = express.Router()
const {user_exists} = require('../src/auth')
const bcrypt = require('bcrypt')

router.get('/', (req,res) => {
    res.render('pages/register', {
        path: 'login',
        page: 'Register',
        error: false,
        message: ''
    })
})

router.post('/', (async (req, res) => {
    let user_existed = await user_exists(db, req)
    if (user_existed){
        return res.render('pages/register', {
            path: 'login',
            page: 'Register',
            error: true,
            message: 'Usuário já existe!'
        })
    }
    try{
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.username, salt, (err, hash) => {
                db.collection('users').insertOne({
                    'name': req.body.username,
                    'password': hash,
                    'money': '1.000.000,00',
                    'rolls': '50'
                })
            })
        })
        return res.redirect('/login')
    }
    catch(e){
        console.log(e)
        return res.render('pages/register', {
            path: 'login',
            page: 'Register',
            error: true,
            message: 'Ocorreu um erro!'
        })
    }
    
}))

module.exports = router