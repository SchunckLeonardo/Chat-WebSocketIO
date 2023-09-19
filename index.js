let express = require('express')
let app = express()
let http = require('node:http')
let server = http.createServer(app)
let io = require('socket.io')(server)

io.on("connection", socket => {
    console.log(socket.id)

    socket.on("disconnect", () => {
        console.log(`O usuário ${socket.id} foi desconectado`)
    })

    socket.on('palavra', data => {
        console.log(data)
        socket.emit("enviar", data + " Bom dia")
    })
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3000, () => {
    console.log('App rodando')
})