import { App } from './app'

class Server {
    private app: App
    private port: number

    constructor() {
        this.app = new App()
        this.port = parseInt(process.env.PORT || '3001', 10)
    }

    public start(): void {
        this.app.getExpressApp().listen(this.port, () => {
            console.log(
                `⚡️[servidor]: API está rodando em http://localhost:${this.port}`,
            )
        })
    }
}

export default Server
