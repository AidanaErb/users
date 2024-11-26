import { IsEmail } from 'class-validator';

export class UpdateUserUseCaseDto {
    id: string;

    firstName?: string;

    lastName?: string;

    @IsEmail()
    email?: string;
}
