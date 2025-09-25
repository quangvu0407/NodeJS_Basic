// const express = require("express")
import express from "express"

const app = express()

const hostname = "localhost"
const post = 8017

app.get('/', function(req, res) {
    res.send('<h1>Hello world nodejs quang quang</h1>')
})

app.listen(post, hostname, () => {
    console.log(`Hello quang quang, i'm running server at ${hostname}: ${post }`)
})