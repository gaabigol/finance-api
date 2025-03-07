import { User } from '@prisma/client'
import { prisma } from '../../../Infrastructure/Database/PrismaClient/PrismaClient'
import { IUserRepository } from '../../../Domain/Contracts/Repository/User/IUserRepository'

export class UserRepository implements IUserRepository {
    public async create(
        userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<User> {
        return await prisma.user.create({
            data: userData,
        })
    }

    public async findById(id: string): Promise<Omit<User, 'password'> | null> {
        return await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                lastName: true,
                transactions: false,
                password: false,
            },
        })
    }

    public async delete(id: string): Promise<User> {
        return await prisma.user.delete({
            where: {
                id,
            },
        })
    }

    public async findAll(filters?: any): Promise<User[]> {
        return await prisma.user.findMany({
            where: filters,
        })
    }

    public async update(id: string, userData: Partial<User>): Promise<User> {
        return await prisma.user.update({
            where: {
                id,
            },
            data: userData,
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        })
    }
}
