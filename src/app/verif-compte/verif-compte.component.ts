import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/Modeles/user';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-verif-compte',
  templateUrl: './verif-compte.component.html',
  styleUrls: ['./verif-compte.component.css']
})
export class VerifCompteComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService, private emailService: EmailService) { }

  ngOnInit() {
    this.authService.getPendingUsers().subscribe(data => {
      this.users = data;
    });
  }

  updateUserStatus(userId: string, status: 'approved' | 'rejected', email: string) {
    this.authService.updateUserStatus(userId, status).subscribe(response => {
      this.users = this.users.filter(user => user.id !== userId);
      alert(`User ${status}`);

      // Define a fixed email subject and message
      const subject = 'Registration Status Update';
      const message = `Your account has been ${status}.`;

      // Send email notification to the user
      this.emailService.sendEmail(email, subject, message).then(() => {
        console.log('Email sent successfully!');
      }).catch(error => {
        console.error('Error sending email:', error);
      });
    });
  }
}
