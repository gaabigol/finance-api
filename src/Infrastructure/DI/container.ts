import { UserController } from '../../Application/Controller/User/UserController'
import { UserRepository } from '../../Application/Repository/User/UserRepository'
import { UserService } from '../../Application/Service/User/UserService'
import { UserRouteModule } from '../Http/Router/User/UserRoutes'

export class Container {
    private static instance: Container
    private container: Map<string, any> = new Map()

    private constructor() {
        this.bootstrap()
    }

    public static getInstance(): Container {
        if (!Container.instance) Container.instance = new Container()

        return Container.instance
    }

    public register(name: string, instance: any): void {
        this.container.set(name, instance)
    }

    public get<T>(name: string): T {
        if (!this.container.has(name))
            throw new Error(`No instance found for ${name}`)
        return this.container.get(name) as T
    }

    private bootstrap(): void {
        this.registerRepositories()
        this.registerServices()
        this.registerControllers()
        this.registerRoutes()
    }

    private registerRepositories(): void {
        this.register('userRepository', new UserRepository())
    }

    private registerServices(): void {
        this.register(
            'userService',
            new UserService(this.container.get('userRepository')),
        )
    }

    private registerControllers(): void {
        this.register(
            'userController',
            new UserController(this.container.get('userService')),
        )
    }

    private registerRoutes(): void {
        this.register(
            'userRouteModule',
            new UserRouteModule(this.container.get('userController')),
        )
    }
}
