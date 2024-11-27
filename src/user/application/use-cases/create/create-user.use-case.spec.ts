import { CreateUserUseCase } from './create-user.use-case';
import { UserAlreadyExistsException } from '../../../domain/exceptions/user-already-exists.exception';
import { Test } from '@nestjs/testing';
import { User } from '../../../domain/entities/user.entity';

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;

    const mockUserRepository = {
        getByEmail: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CreateUserUseCase,
                {
                    provide: 'IUserRepository',
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    });

    it('should create a user successfully when email is unique', async () => {
        const userDto = { email: 'unique@gmail.com', firstName: 'Test', lastName: 'User' };
        const userEntity = User.create(userDto);

        mockUserRepository.getByEmail.mockResolvedValue(null); // No existing user
        mockUserRepository.create.mockResolvedValue(userEntity);

        const result = await createUserUseCase.execute(userDto);

        expect(result.email).toEqual(userDto.email);
        expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(userDto.email);
        expect(mockUserRepository.create).toHaveBeenCalledWith(expect.any(User));
    });

    it('should throw an error if email already exists', async () => {
        const userDto = { email: 'unique@gmail.com', firstName: 'Test', lastName: 'User' };
        const existingUser = User.create(userDto);

        mockUserRepository.getByEmail.mockResolvedValue(existingUser);

        await expect(createUserUseCase.execute(userDto)).rejects.toThrow(
            UserAlreadyExistsException,
        );
        expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(userDto.email);
    });
});
