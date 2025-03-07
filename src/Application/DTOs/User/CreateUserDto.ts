import { EmailValidator } from '../../../Shared/Helpers/EmailValidator'

export class CreateUserDTO {
    private name: string
    private lastName: string
    private email: string
    private password: string
    private errors: Array<{ property: string; message: string }> = []

    constructor(
        name: string | undefined,
        lastName: string | undefined,
        email: string | undefined,
        password: string | undefined,
    ) {
        this.name = name ?? ''
        this.lastName = lastName ?? ''
        this.email = email ?? ''
        this.password = password ?? ''
    }

    public getName(): string {
        return this.name
    }

    public getLastName(): string {
        return this.lastName
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }

    public getErrors(): object[] {
        return this.errors
    }

    public isValid(): boolean {
        this.validateRequest()
        return this.errors.length === 0
    }

    public getPayload(): {
        name: string
        lastName: string
        email: string
        password: string
    } {
        return {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
        }
    }

    private validateRequest(): void {
        if (!this.name) {
            this.errors.push({
                property: 'name',
                message: 'Name is required',
            })
        }

        if (!this.lastName) {
            this.errors.push({
                property: 'lastName',
                message: 'Last name is required',
            })
        }

        if (!this.email) {
            this.errors.push({
                property: 'email',
                message: 'Email is required',
            })
        }

        if (!EmailValidator.validate(this.email)) {
            this.errors.push({ property: 'email', message: 'Invalid email' })
        }

        if (!this.password) {
            this.errors.push({
                property: 'password',
                message: 'Password is required',
            })
        }

        if (this.password.length < 6) {
            this.errors.push({
                property: 'password',
                message: 'Password must have at least 6 characters',
            })
        }

        if (this.password.length > 20) {
            this.errors.push({
                property: 'password',
                message: 'Password must have a maximum of 20 characters',
            })
        }
    }
}
