import { Component, OnInit } from '@angular/core';
import { OrderStatusNames, OrderCategoryNames, OrderPriorityNames } from '../../../Enums/OrderEnums';
import { OrderService } from '../../../Services/order.service';
import { OrderFilter } from '../../../models/order/order-filter-model'
import { Order } from '../../../models/order/order-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderStatus, OrderPriority, OrderCategory } from '../../../Enums/OrderEnums';
import { Router } from '@angular/router';
import { User } from '../../../models/user/user-model';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

 
  public orders: Order[] = [];
  public filteredOrders: Order[] = [];
  currentFilter: OrderFilter = {};

  public OrderStatusNames = OrderStatusNames;
  public OrderCategoryNames = OrderCategoryNames;
  public OrderPriorityNames = OrderPriorityNames;

  isLoading?: boolean;

  selectedOrdersIds: string[] = [];
  selectAllCheckbox: boolean = false;

  public Status = OrderStatus;
  public Category = OrderCategory;
  public Priority = OrderPriority;

  newOrder = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    status: new FormControl(OrderStatus.Canceled, Validators.required),
    category: new FormControl(OrderCategory.EmailCampaing, Validators.required),
    priority: new FormControl(OrderPriority.Medium, Validators.required),
    receiverId: new FormControl(null, Validators.required),
  });

  orderStatuses = Object.values(OrderStatusNames);
  orderCategories = Object.values(OrderCategoryNames);
  orderPriorities = Object.values(OrderPriorityNames);

  totalPages: number = 0;
  currentPage: number = 1;
  constructor(private orderService: OrderService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadOrdersByPage(1);
    
  }



  onFiltersChange(event: string[]): void {
    const [status, category, priority, user, sortByElement, sortByDirection] = event;    

    const filter: OrderFilter = {
      status,
      category,
      priority,
      user,
      sortByElement,
      sortByDirection
    };

    this.currentFilter = filter;

    this.loadOrdersByPage(this.currentPage, this.currentFilter);
  }



  createNewOrder(): void {
    if (this.newOrder.valid) {
      const createdOrder: Partial<Order> = {
        firstName: this.newOrder.value.firstName,
        lastName: this.newOrder.value.lastName,
        topic: this.newOrder.value.topic,
        status: Number(this.newOrder.value.status),
        category: Number(this.newOrder.value.category),
        priority: Number(this.newOrder.value.priority),
        receiverId: this.newOrder.value.receiverId,
      };
      this.orderService.addNewOrder(createdOrder).subscribe({
        next: (response) => {
          this.newOrder.reset();
          this.loadOrdersByPage(this.currentPage);
          this.isLoading = false; 
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  deleteOrders(): void {
    this.orderService.deleteOrders(this.selectedOrdersIds).subscribe({
      next: (response) => {
        this.selectedOrdersIds = [];
        this.selectAllCheckbox = false;
        this.loadOrdersByPage(this.currentPage);
        this.isLoading = false; 
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false; 
      }
    })
  }

  isSelected(orderId: string): boolean {
    return this.selectedOrdersIds.includes(orderId);
  }

  toggleSelection(orderId: string, checked: boolean): void {
    checked
      ? this.selectedOrdersIds.push(orderId)
      : this.selectedOrdersIds = this.selectedOrdersIds.filter(id => id !== orderId);

    this.updateSelectAllCheckboxState();
  }

  toogleSelectionAll(): void {
    this.selectAllCheckbox = !this.selectAllCheckbox;
    if (this.selectAllCheckbox) {
      this.selectedOrdersIds = this.filteredOrders
        .map(order => order.id)
        .filter(id => id !== undefined) as string[];
    } else {
      this.selectedOrdersIds = [];
    }
  }


  getCheckboxChecked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  updateSelectAllCheckboxState(): void {
    this.selectAllCheckbox = this.filteredOrders.length > 0 &&
      this.filteredOrders.every(order => order.id != null && this.selectedOrdersIds.includes(order.id));
  }


  loadOrdersByPage(page: number, filter?: OrderFilter): void {
    this.orderService.loadOrdersByParams(filter ?? this.currentFilter, page).subscribe({
      next: (response) => {
        this.filteredOrders = response.items; 
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false; 
      }
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadOrdersByPage(pageNumber);
  }

  goToOrderDetails(orderId: string): void {
    this.router.navigate(['/dashboard/order', orderId]);
  }

}



