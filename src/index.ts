import { config } from 'dotenv'
import Server from './server'
import { Container } from './Infrastructure/DI/container'

config()

Container.getInstance()

const server = new Server()
server.start()

process.on('SIGINT', () => {
    console.log('Encerrando aplicação...')
    process.exit(0)
})

process.on('SIGTERM', () => {
    console.log('Encerrando aplicação...')
    process.exit(0)
})

process.on('uncaughtException', (error) => {
    console.error('Erro não tratado:', error)
    process.exit(1)
})

process.on('unhandledRejection', (reason) => {
    console.error('Promessa rejeitada não tratada:', reason)
    process.exit(1)
})
