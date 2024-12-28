import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Class to connect user table and perform business operations
 */

@Injectable()
export class UsersService {
  /**
   * Inject AuthService for circular dependency
   */

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // check if user already exists with same email

    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    // Handle exception

    // Creare a new User

    let newUser = this.userRepository.create(createUserDto);

    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  /**
   *  public method responsible for fetching all users get request for /users endpoint
   */
  findAll(getUserParamDto: GetUserParamDto, limit: number, page: number) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        firstName: 'John',
        email: 'John@gmail.com',
      },
      {
        firstName: 'test',
        email: 'test@gmail.com ',
      },

      {
        firstName: 'test2',
        email: 'test2@gmail.com ',
      },
    ];
  }

  /**
   * The method to get user by its Id
   */
  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'John',
      email: 'john@gmail.com',
    };
  }
}
