import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { Order } from '../../../models/order/order-model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusNames, OrderCategoryNames, OrderPriorityNames } from '../../../Enums/OrderEnums';
import { OrderDetails } from '../../../models/order/order-details-model';
import { MessageService } from '../../../Services/message.service';
import { Message } from '../../../models/message/message-model';
import { CreateMessage } from '../../../models/message/createMessage';
import { AuthUserService } from '../../../../core/services/auth-user.service';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../models/user/user-model';

@Component({
  selector: 'app-order-details',
  standalone: false,
  
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  orderId: string | null = null; 
  orderDetails?: OrderDetails;
  public messages?: Message[] = [];
  loggedUserId?: string | null;
  message = '';
  isLoading?: boolean;
  public OrderStatusNames = OrderStatusNames;
  public OrderCategoryNames = OrderCategoryNames;
  public OrderPriorityNames = OrderPriorityNames;

  public user: User = {
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    isActivated: null
  };
 
  constructor(private orderService: OrderService, private http: HttpClient, private route: ActivatedRoute, private messService: MessageService, private authUserService: AuthUserService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');   
    this.loggedUserId = this.authUserService.getUserId();
    if (this.orderId) {
      this.loadOrderDetails(this.orderId);
      this.loadMessages(this.orderId);
      this.loadUserDetails();
    } else {
      console.error('Brak ID zamówienia w URL!');
    }
  }

  loadOrderDetails(id: string): void {
    this.isLoading = true; 
    this.orderService.getOrderDetails(id).subscribe({
      next: (response) => {
        this.orderDetails = response;
        console.log(this.orderDetails)
        this.isLoading = false;    
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false; 
      }
    });
  }

  loadMessages(id: string): void {
    this.messService.getMessages(id).subscribe({
      next: (response) => {
        this.messages = response;
        console.log(this.messages);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  sendMessage(): void {
    const newMessage: CreateMessage = {
      orderId: this.orderId!,
      content: this.message
    };
    this.messService.addMessage(newMessage).subscribe({
      next: (message: Message) => {
        console.log('Wysłano wiadomość:', message);
        this.messages?.push(message);
        this.message = '';
      },
    })
  }

  loadUserDetails(): void {
    this.userService.getAccountDetails().subscribe({
      next: (user) => {
        this.user = user;

      },
      error: (error) => {
        console.error('Błąd przy ładowaniu danych użytkownika:', error);
      }
    })
  }

}
