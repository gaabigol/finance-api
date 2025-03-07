import { Router } from 'express'

export interface IRouteModule {
    register(router: Router): void
}
