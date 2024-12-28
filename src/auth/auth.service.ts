import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  // Inject UsersService

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    // Check user exitst database
    const user = this.usersService.findOneById('1234');
    // login
    return 'Sample_Token';
    // token
  }

  public isAuth() {
    return true;
  }
}
