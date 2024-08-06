import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "src/auth/jwt/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PasswordService } from "./passwords/password.service";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, PasswordService]
})
export class AuthModule { }