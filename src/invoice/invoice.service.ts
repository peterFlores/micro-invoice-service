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

        const pdf = require('html-pdf');

        const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
          .factura {
            table-layout: fixed;
          }
          
          .fact-info > div > h5 {
            font-weight: bold;
          }
          
          .factura > thead {
            border-top: solid 3px #000;
            border-bottom: 3px solid #000;
          }
          
          .factura > thead > tr > th:nth-child(2), .factura > tbod > tr > td:nth-child(2) {
            width: 300px;
          }
          
          .factura > thead > tr > th:nth-child(n+3) {
            text-align: right;
          }
          
          .factura > tbody > tr > td:nth-child(n+3) {
            text-align: right;
          }
          
          .factura > tfoot > tr > th, .factura > tfoot > tr > th:nth-child(n+3) {
            font-size: 24px;
            text-align: right;
          }
          
          .cond {
            border-top: solid 2px #000;
          }
          </style>
        </head>
        <body>
        </div><div id="app" class="col-11">

        <h2>Factura</h2>

        <div class="row my-3">
          <div class="col-10">
            <h1>Mil Pasos</h1>
            <p>Av. Winston Churchill</p>
            <p>Plaza Orleans 3er. nivel</p>
            <p>local 312</p>
          </div>
          <div class="col-2">
            <img src="~/images/Mil-Pasos_Negro.png" />
          </div>
        </div>
      
        <hr />
      
        <div class="row fact-info mt-3">
          <div class="col-3">
            <h5>Facturar a</h5>
            <p>
              Arian Manuel Garcia Reynoso
            </p>
          </div>
          <div class="col-3">
            <h5>Enviar a</h5>
            <p>
              Cotui, Sanchez Ramirez
              Santa Fe, #19
              arianmanuel75@gmail.com
            </p>
          </div>
          <div class="col-3">
            <h5>N° de factura</h5>
            <h5>Fecha</h5>
            <h5>Fecha de vencimiento</h5>
          </div>
          <div class="col-3">
            <h5>103</h5>
            <p>09/05/2019</p>
            <p>09/05/2019</p>
          </div>
        </div>
      
        <div class="row my-5">
          <table class="table table-borderless factura">
            <thead>
              <tr>
                <th>Cant.</th>
                <th>Descripcion</th>
                <th>Precio Unitario</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Clases de Cha-Cha-Cha</td>
                <td>3,000.00</td>
                <td>3,000.00</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Clases de Salsa</td>
                <td>4,000.00</td>
                <td>12,000.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th>Total Factura</th>
                <th>RD$15,000.00</th>
              </tr>
            </tfoot>
          </table>
        </div>
      
        <div class="cond row">
          <div class="col-12 mt-3">
            <h4>Condiciones y formas de pago</h4>
            <p>El pago se debe realizar en un plazo de 15 dias.</p>
            <p>
              Banco Banreserva
              <br />
              IBAN: DO XX 0075 XXXX XX XX XXXX XXXX
              <br />
              Código SWIFT: BPDODOSXXXX
            </p>
          </div>
        </div>
        </div>
        </body>
        </html>
        `;

        pdf.create(content).toFile('./prueba.pdf', function(err, res) {
            if (err){
                console.log(err);
            } else {
                console.log(res);
            }
        });

        const msg = {
        to: requestinvoice.email, // Change to your recipient
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>Mensaje with Node.js</strong>',
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






}
