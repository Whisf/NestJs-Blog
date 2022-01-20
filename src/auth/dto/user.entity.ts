import { ApiProperty } from "@nestjs/swagger";
import { Post, Role } from "@prisma/client";

export class User {
    id: string;

    @ApiProperty({example: 'nhattan@gmail.com', description: 'user\'s email'})
    email: string;

    @ApiProperty({example: 'abcdefg123', description: 'user\'s password'})
    password: string

    @ApiProperty({example: 'USER', description: 'user\'s role'})
    role: Role;

    post: Array<Post>;
}