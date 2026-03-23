import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message/message-model';
import { Observable } from 'rxjs';
import { CreateMessage} from '../models/message/createMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }



  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`/api/message/${id}`);
  }

  addMessage(model: CreateMessage): Observable<Message> {
    return this.http.post<Message>('/api/message', model);
  }
  
}
