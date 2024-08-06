import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminOrAccountOwnerGuard } from 'src/guards/admin-or-account-owner.guard';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query() findAllUsersQueryDto: FindAllUsersQueryDto
  ) {
    const { offset, limit, filter } = findAllUsersQueryDto;
    return this.usersService.findAll(offset, limit, filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminOrAccountOwnerGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminOrAccountOwnerGuard)
  async deleteOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.usersService.deleteOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminOrAccountOwnerGuard)
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateOne(id, updateUserDto);
  }
}
