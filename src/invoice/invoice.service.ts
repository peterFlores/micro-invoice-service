/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { RequestInvoice } from './invoice_data.model';

@Injectable()
export class InvoiceService {
    constructor(
        private readonly sendGrid: SendGridService
    ) {}
    
      async sendEmail(requestinvoice: RequestInvoice): Promise<void> {
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SEND_GRID_ACCESS_KEY)

        const fs = require('fs');

        try {
          fs.unlinkSync('./prueba.pdf')
          console.log('File removed')
        } catch(err) {
          console.error('Something wrong happened removing the file', err)
        }

        const Mustache = require('mustache');
        const data = {
          transactionId: requestinvoice.transactionId,
          email: requestinvoice.email,
          cliente: requestinvoice.cliente,
          check_in: requestinvoice.check_in,
          check_out: requestinvoice.check_out,
          hostal_name: requestinvoice.hostal_name,
          room_name: requestinvoice.room_name,
          nights: requestinvoice.nights,
          adults: requestinvoice.adults,
          childs: requestinvoice.childs,
          total: requestinvoice.total
        }  

        // Read the HTML template from disk.
        const template = fs.readFileSync('./invoice.html', { encoding: 'utf-8' });
        const filledTemplate = Mustache.render(template, data);
        const pdf = require('html-pdf');

        const content = `
        `;

        pdf.create(filledTemplate).toFile('./prueba.pdf', function(err, res) {
            if (err){
                console.log(err);
            } else {
                console.log(res);
                const attachment = fs.readFileSync('./prueba.pdf').toString("base64")

                const msg = {
                to: requestinvoice.email, // Change to your recipient
                from: process.env.FROM_EMAIL, // Change to your verified sender
                subject: 'Documentacion de Factura',
                text: 'Informacion de la Factura',
                html: content,
                attachments: [
                  { content: attachment, filename: 'Reservacion', type: 'application/pdf', disposition: 'attachment' },
                ],
                }
                sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
            }
        });

        
      }






}
