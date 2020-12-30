const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

server.listen(PORT, _ => { console.log(`🔥Server Connected on: http://localhost:${PORT}`) })