import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/Modeles/user';
import { EmailService } from './email.service';
import { generateConversationId } from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private currentUser: User | null = null;
  private adminId = '3'; // ID de l'administrateur

  constructor(private http: HttpClient, private emailService: EmailService) {}

  signup(data: User): Observable<any> {
    const newUser = { ...data, status: 'pending' };
    return this.http.post<User>(`${this.apiUrl}/users`, newUser).pipe(
      tap((user: User) => {
        const conversationId = generateConversationId(this.adminId, user.id); 
        const conversation = { id: conversationId, participants: [this.adminId, user.id], responsableName: `${user.nom} ${user.prenom}` };
        this.http.post(`${this.apiUrl}/conversations`, conversation).subscribe();
      })
    );
  }

  getPendingUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?status=pending`);
  }

  updateUserStatus(userId: string, status: 'approved' | 'rejected'): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, { status });
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          if (user.status === 'approved') {
            if (email === 'admin@admin.com' && password === 'admin') {
              user.role = 'admin';
            } else {
              user.role = 'responsable';
            }
            this.currentUser = user;
            this.setCurrentUser(this.currentUser);
            return this.currentUser;
          } else {
            throw new Error('Your account is not approved.');
          }
        } else {
          throw new Error('Invalid email or password.');
        }
      }),
      catchError(error => throwError(error.message || 'Server Error'))
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }

  isResponsable(user: User): boolean {
    return user.role === 'responsable';
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    return this.currentUser;
  }

  getCurrentUserId(): string {
    const user = this.getCurrentUser();
    return user ? user.id : '';
  }
}
