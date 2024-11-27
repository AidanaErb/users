import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserUseCaseDto {
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsEmail()
    email: string;
}
