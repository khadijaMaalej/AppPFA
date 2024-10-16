import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { Message } from 'src/Modeles/message';
import { generateConversationId } from 'src/utils'; // Importer la fonction

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked {
  messageForm: FormGroup;
  messages: Message[] = [];
  userId: string | null = null;
  adminId = '3'; // ID de l'administrateur

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.messageForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.loadMessages();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadMessages() {
    if (this.userId) {
      const conversationId = generateConversationId(this.userId, this.adminId);
      this.messageService.getMessages(conversationId).subscribe((messages) => {
        this.messages = messages;
        this.scrollToBottom();
      });
    }
  }

  sendMessage() {
    if (this.messageForm.valid && this.userId) {
      const newMessage: Message = {
        id: Date.now().toString(),
        conversationId: generateConversationId(this.userId, this.adminId),
        senderId: this.userId,
        receiverId: this.adminId,
        content: this.messageForm.value.content,
        timestamp: new Date()
      };

      this.messageService.sendMessage(newMessage).subscribe((message) => {
        this.messages.push(message);
        this.messageForm.reset();
        this.scrollToBottom(); // Défile vers le bas après l'envoi du message
      });
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Erreur lors du défilement vers le bas:', err);
    }
  }
}
