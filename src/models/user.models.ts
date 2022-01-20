import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsEmail()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class SignInBody {
    @ApiProperty()
    user: UserDto;
}

export class SignUpBody {
    @ApiProperty()
    user: UserDto;
}