import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_6vb9iar';
  private templateId = 'template_ac8e379';
  private publicKey = 'GCVTiIJ8vZuxgDrdA';  // Use your actual public key here

  constructor() { }
  sendEmail(toEmail: string, subject: string, message: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email: toEmail,
      subject: subject,
      message: message
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey);
  }
}