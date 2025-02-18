import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API funcionando!' })
})

app.get('/hello', (req: Request, res: Response) => {
    res.json({ message: 'Olá, mundo!' })
})

app.listen(port, () => {
    console.log(`⚡️[servidor]: API está rodando em http://localhost:${port}`)
})
