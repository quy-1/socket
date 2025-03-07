import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';

import UserSchema,{ User} from 'src/database/schema/user.schema';
import { UserRepository } from '../../database/repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [UserService, UserRepository],
})
export class UserModule {}
