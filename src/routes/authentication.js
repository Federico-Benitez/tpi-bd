const express = require('express')
const router = express.Router();

const pool = require('../database')

router.post('/login', async(req,res) => {

   
    res.render('auth/perfil', {message:"logueado"})
})

module.exports = router;