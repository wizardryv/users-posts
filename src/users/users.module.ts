import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { PasswordService } from 'src/auth/passwords/password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PasswordService],
})
export class UsersModule {}
