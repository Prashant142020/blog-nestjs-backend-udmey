import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Inject the UsersService
     */

    private readonly usersService: UsersService,
  ) {}

  public findAll(userId: string) {
    // Users Service

    const user = this.usersService.findOneById(userId);
    // Find A User
    return [
      {
        user: user,
        tittle: 'Post 1',
        content: 'Content 1',
      },
      {
        user: user,
        tittle: 'Post 2',
        content: 'Content 2',
      },
    ];
  }

  // Return Posr
}
