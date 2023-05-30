const fs = require("fs");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended:false}));


app.use("/login",(req,res,next)=>{
    res.send(`<html><head><title>Log-In Page</title></head><body><form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" action='/' method='post'><input type='text'  id='username' name='username'><button type='submit'>Log-In</button></form></body></html>`)
})

app.post("/",(req,res,next)=>{
    fs.writeFile("Message.txt"," ",()=>{
        res.redirect("/");
    })       
})

app.get("/",(req,res,next)=>{
    fs.readFile("Message.txt","utf-8",(err,data)=>{
        if(err)
        {
            alert(err);
            data = "Not Able to Display data."
        }
        if(data !== undefined)
        {
            res.send(`<html><head><title>SEND A MESSAGE</title></head><body>${data}<br><form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action='/message' method='post'><input type='text' name='Message'><input type='hidden' id='username' name='username'><button type='submit'>SEND</button></form></body></html>`)
        }
    })
    
})

app.post("/message",(req,res,next)=>{
    let username = req.body.username;
    let msg = req.body.Message;
    fs.writeFile("Message.txt",`${username}:${msg}`,{flag:"a"},()=>{
        res.redirect("/");
    });
})

app.listen(4000);