import { Request, Response } from 'express'
import { CreateUserDTO } from '../../DTOs/User/CreateUserDto'
import { HttpErrorFactory } from '../../../Shared/Exceptions/HttpErrorFactory'
import { IUserService } from '../../../Domain/Contracts/Service/IService'

export class UserController {
    private readonly service: IUserService

    constructor(service: IUserService) {
        this.service = service
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const dto = new CreateUserDTO(
            request.body.name,
            request.body.lastName,
            request.body.email,
            request.body.password,
        )

        if (!dto.isValid()) {
            return response.status(400).json({
                error: true,
                message: 'Dados de usuário inválidos',
                errors: dto.getErrors(),
            })
        }
        const user = await this.service.create(dto.getPayload())
        return response.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: user,
        })
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        if (!id)
            throw HttpErrorFactory.createBadRequest(
                'Dados de usuário inválidos',
            )

        const user = await this.service.findById(id)

        return response.status(200).json({
            success: true,
            data: user,
        })
    }
}
