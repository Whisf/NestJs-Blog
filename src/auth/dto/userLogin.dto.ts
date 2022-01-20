import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({example: 'nhattan@gmail.com', description: 'user\'s email'})
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(32)
    @ApiProperty({example: 'abcdefg123', description: 'user\'s password'})
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password is too weak'})
    password: string;
}