import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { Message } from 'src/Modeles/message';
import { generateConversationId } from 'src/utils';

@Component({
  selector: 'app-message-admin',
  templateUrl: './message-admin.component.html',
  styleUrls: ['./message-admin.component.css']
})
export class MessageAdminComponent implements OnInit, AfterViewChecked {
  messageForm: FormGroup;
  messages: Message[] = [];
  adminId = '3';
  selectedConversationId: string | null = null;
  conversations: any[] = [];

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.messageForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadConversations();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadConversations() {
    this.messageService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
    });
  }

  selectConversation(conversationId: string) {
    this.selectedConversationId = conversationId;
    this.loadMessages(conversationId);
  }

  loadMessages(conversationId: string) {
    if (conversationId) {
      this.messageService.getMessages(conversationId).subscribe(messages => {
        this.messages = messages;
        this.scrollToBottom();
      });
    }
  }

  sendMessage() {
    if (this.messageForm.valid && this.selectedConversationId) {
      const receiverId = this.conversations.find(conv => conv.id === this.selectedConversationId)?.participants.find((id: string) => id !== this.adminId);
      if (receiverId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          conversationId: this.selectedConversationId,
          senderId: this.adminId,
          receiverId: receiverId,
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
  }

  getResponsableName(conversationId: string): string {
    const conversation = this.conversations.find(conv => conv.id === conversationId);
    return conversation ? conversation.responsableName : '';
  }

  generateConversationId(userId: string): string {
    return generateConversationId(this.adminId, userId);
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Erreur lors du défilement vers le bas:', err);
    }
  }
}
