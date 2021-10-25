/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { RequestInvoice } from './invoice_data.model';

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly appService: InvoiceService) {}

    @Post('generateInvoice')
    async sendEmail(@Body() model: RequestInvoice): Promise<void> {
        await this.appService.sendEmail(model);
    }

}
