import { Controller, Param, Patch } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { UserService } from "src/services/user.service";

@Controller('User')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Patch('/:email')
    @ApiCreatedResponse({ description: 'change Password'})
    @ApiOkResponse({ description: 'Change password successful' })
    @ApiParam({
        type: String,
        name: 'email'
     })
    changePassword(@Param() user: {email: string}){
        return this.userService.changePassword(user);
    }
}