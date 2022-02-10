import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ChangePassword } from "src/controllers/user/dto/change_password.dto";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    async changePassword(user: {email: string}) {
        console.log(user)
        const user_1 = this.prisma.user.findUnique({ where: {email: user.email}})
        user_1.then(data => {
            console.log(data)
        })
    }

}