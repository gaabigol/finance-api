import { Router } from 'express'
import { IRouteModule } from '../Interfaces/Router/IRouterModule'
import { Container } from '../../DI/container'

export class RouterManager {
    private router: Router
    private modules: IRouteModule[]
    private container: Container

    constructor() {
        this.router = Router()
        this.container = Container.getInstance()
        this.modules = this.getRouteModules()
        this.setupRoutes()
    }

    private setupRoutes(): void {
        this.modules.forEach((module) => {
            module.register(this.router)
        })
    }

    private getRouteModules(): IRouteModule[] {
        return [this.container.get<IRouteModule>('userRouteModule')]
    }

    public getRouter(): Router {
        return this.router
    }
}
