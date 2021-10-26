/* eslint-disable prettier/prettier */
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    InvoiceModule,
    ConfigModule.forRoot(),
    SendGridModule.forRoot({apikey: process.env.SEND_GRID_ACCESS_KEY}),
    MongooseModule.forRoot('mongodb://admin:admin@137.135.92.123:27017/hostal', {
      autoCreate: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
