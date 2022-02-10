import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/auth/auth.module';
import { PostModule } from './controllers/post/post.module';
import { UserModule } from './controllers/user/user.module';


@Module({
  imports: [AuthModule, PostModule, UserModule],
})
export class AppModule {}
