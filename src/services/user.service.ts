import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ChangePassword } from "src/controllers/user/dto/change_password.dto";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }

}
