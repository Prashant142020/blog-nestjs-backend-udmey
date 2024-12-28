import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { GetUserParamDto } from './dto/get-user-param.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  /**
   * The constructor is used to inject the UsersService into the UsersController
   */

  constructor(private readonly usersService: UsersService) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetch all list of users that are registered in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of users has been successfully fetched',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'Limit the number of users',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description:
      'The Postition of hte page number that you want to get the api return',
    example: 1,
  })
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    
   
    return this.usersService.createUser(createUserDto);
  }

  @Patch()
  public pactchUser(@Body() pactchUser: PatchUserDto) {
    return pactchUser;
  }
}
