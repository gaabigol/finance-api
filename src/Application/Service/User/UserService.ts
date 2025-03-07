import { User } from '@prisma/client'
import { PasswordBcrypt } from '../../../Shared/Helpers/PasswordBcrypt'
import { HttpErrorFactory } from '../../../Shared/Exceptions/HttpErrorFactory'
import { IUserRepository } from '../../../Domain/Contracts/Repository/User/IUserRepository'
import { IUserService } from '../../../Domain/Contracts/Service/IService'

export class UserService implements IUserService {
    private readonly repository: IUserRepository

    constructor(repository: IUserRepository) {
        this.repository = repository
    }

    public async create(
        userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<User> {
        const alreadyExists = await this.repository.findByEmail(userData.email)
        if (alreadyExists)
            throw HttpErrorFactory.createBadRequest('User already exists')
        const password = await PasswordBcrypt.hash(userData.password)
        return await this.repository.create({ ...userData, password })
    }

    public async findById(id: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.repository.findById(id)
        if (!user) throw HttpErrorFactory.createNotFound('User not found')
        return user
    }

    public async delete(id: string): Promise<User> {
        return await this.repository.delete(id)
    }

    public async findAll(filters?: any): Promise<User[]> {
        return await this.repository.findAll(filters)
    }

    public async update(id: string, userData: Partial<User>): Promise<User> {
        return await this.repository.update(id, userData)
    }
}
