let express = require('express')
let app = express()
let http = require('node:http')
let server = http.createServer(app)
let io = require('socket.io')(server)

let oldMessages = []

io.on("connection", socket => {
    socket.on("disconnect", () => {
        console.log(`O usuário ${socket.id} foi desconectado`)
    })

    socket.on("msg", data => {
        oldMessages.push(data)
        io.emit("showMsg", data)
    })
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3030, () => {
    console.log('App rodando')
})