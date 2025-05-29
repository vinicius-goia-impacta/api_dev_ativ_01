import { Module } from '@nestjs/common'
import { UserClientApplicationController } from './userclient.application.controller';

@Module({
    imports: [],
    controllers: [UserClientApplicationController],
    providers: [],
})

export class UserClientApplicationModule {}