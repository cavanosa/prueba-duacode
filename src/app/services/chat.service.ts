import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatBotRequest } from '../model/chat-bot-request';
import { Observable } from 'rxjs';
import { ChatBotResponse } from '../model/chat-bot-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatUrl = 'backend/chat';

  constructor(private httpClient: HttpClient) { }

  // pregunta al chatbot
  public chat(request: ChatBotRequest): Observable<ChatBotResponse> {
    return this.httpClient.post<ChatBotResponse>(this.chatUrl, request);
  }


}
