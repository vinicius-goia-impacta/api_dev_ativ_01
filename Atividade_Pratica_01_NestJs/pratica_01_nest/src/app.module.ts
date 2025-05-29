import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserClientApplicationModule } from './userclient/userclient.application.module';

@Module({
  imports: [UserClientApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
