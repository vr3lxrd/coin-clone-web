const session = require("express-session")
const express = require('express')
const { promiseImpl } = require("ejs")

module.exports = {
    login_verifier: (res) => {
       console.log(session.userId)
       session.userId === undefined ? true : false
    },
    user_exists: async (db, req) => {
        let bool = false
        let users = await db.collection('users').find().toArray()
        users.forEach(element => {
            if (element.name === req.body.username){
                bool = true
            }
        })
        return bool

    },
        
}