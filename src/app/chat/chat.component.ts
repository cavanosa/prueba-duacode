import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatBotResponse } from '../model/chat-bot-response';
import { error } from 'console';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  request = '';
  response = '';
  memoryId = '';

  constructor(
    private chatService: ChatService
  ) { }

  public send(): void {
    this.response = '..esperando respuesta (paciencia, soy muy pelmazo)';
    this.chatService.chat({
      memoryId: this.memoryId,
      message: this.request
    }).subscribe({
      next: ((res: ChatBotResponse) => {
        this.response = res.responseMessage;
      }), error: ((error: any) => {
        this.response = error;
      })
    });
  }

}
