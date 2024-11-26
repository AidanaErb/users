import { IsEmail, IsString } from 'class-validator';

export class CreateUserUseCaseDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;
}
