import { User } from '@prisma/client'

export interface IUserService {
    create(
        userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<User>
    findById(id: string): Promise<Omit<User, 'password'> | null>
    update(id: string, userData: Partial<User>): Promise<User>
    delete(id: string): Promise<User>
    findAll(filters?: any): Promise<User[]>
}
