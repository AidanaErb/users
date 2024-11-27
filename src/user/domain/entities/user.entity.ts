import { Expose } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Entity } from '../../../shared/common/entity';

export interface IUserCreationAttributes {
    email: string;
    firstName?: string;
    lastName?: string;
}

export class User extends Entity<string> {
    @Expose()
    public id: string;

    @Expose()
    public email: string;

    @Expose()
    public firstName: string;

    @Expose()
    public lastName: string;

    @Expose()
    public createdAt: Date;

    @Expose()
    public updatedAt: Date;

    private constructor() {
        super();
    }

    public static create(creationAttributes: IUserCreationAttributes): User {
        const user = new User();
        user.id = randomUUID();
        user.email = creationAttributes.email;
        user.firstName = creationAttributes.firstName || '';
        user.lastName = creationAttributes.lastName || '';
        return user;
    }

    public updateDetails(attributes: Partial<IUserCreationAttributes>): void {
        if (attributes.firstName) this.firstName = attributes.firstName;
        if (attributes.lastName) this.lastName = attributes.lastName;
        this.updatedAt = new Date();
    }
}
