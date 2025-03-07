import { Router } from 'express'
import { UserController } from '../../../../Application/Controller/User/UserController'
import { asyncHandler } from '../../Middleware/AsyncHandler'
import { IRouteModule } from '../../Interfaces/Router/IRouterModule'

export class UserRouteModule implements IRouteModule {
    private userController: UserController

    constructor(userController: UserController) {
        this.userController = userController
    }

    public register(router: Router): void {
        const userRouter = Router()

        userRouter.post(
            '/',
            asyncHandler(this.userController.create.bind(this.userController)),
        )
        userRouter.get(
            '/:id',
            asyncHandler(this.userController.get.bind(this.userController)),
        )

        router.use('/users', userRouter)
    }
}
