import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import createGame from './public/game.js'
import { Socket } from 'dgram'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))
const game = createGame()
game.start()

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    let playersCount = Object.keys(game.state.players).length
    if(playersCount <=2 ) {
        const playerId = socket.id

        console.log(`> Player connected on Server with id: ${playerId}`)
    
        game.addPlayer({playerId: playerId})
    
        socket.emit('setup', game.state)
    
        socket.on('disconnect', () => {
            game.removePlayer({playerId: playerId})
            console.log(`> Player disconnected: ${playerId}`)
        })
    } else {
        console.log(`> Someone try entry the room, but game room is full!`)
    }
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})