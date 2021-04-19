import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import socketClient from 'socket.io-client'
import cors from 'cors'
import { SendMassageService } from 'services/SendMassageService'

const port = 4444

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new socketIo.Server(server)

const sendMessageService = new SendMassageService()

let interval

io.on('connection', (socket) => {
  console.log('New client connected')
  if (interval) {
    clearInterval(interval)
  }
  socket.on('FromAPI', (data) => {
    sendMessageService.execute({
      name: 'Pedro Henrique',
      message: data,
      number: '5584992003838'
    })
  })

  app.post('/send-chat', (request, response) => {
    const { message } = request.body

    const parsedMessage = String(message)

    console.log(parsedMessage)

    const resSock = socket.emit('FromAPI', parsedMessage)

    console.log(resSock)

    return response.status(201).json({ message: message })
  })

  app.post('/chat', async (request, response) => {
    const { message } = request.body

    socket.emit('FromAPI', message)

    return response.status(201).json({ message: 'res', hello: '23' })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    clearInterval(interval)
  })
})

// const getApiAndEmit = socket => {
//   const response = new Date()
//   // Emitting a new message. Will be consumed by the client
//   socket.emit('FromAPI', response)
// }

// const clientSocket = socketClient('http://105.103.84.67:4444')

// app.post('/chat', async (request, response) => {
//   const { message } = request.body

//   clientSocket.emit('FromAPI', message)

//   return response.status(201).json({ message: 'res', hello: '23' })
// })

server.listen(port, () => console.log(`Listening on port ${port}`))
