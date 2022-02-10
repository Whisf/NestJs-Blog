import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserService } from "src/services/user.service";
import { UserController } from "./user.controller";



@Module({
    imports: [UserModule],
    controllers: [UserController],
    providers: [PrismaService, UserService]
})

export class UserModule {}
