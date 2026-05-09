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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthUserService } from '../../../../core/services/auth-user.service'

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
    topic: new FormControl('', Validators.required),
    status: new FormControl(OrderStatus.InProgress, Validators.required),
    category: new FormControl(OrderCategory.Hardware, Validators.required),
    priority: new FormControl(OrderPriority.Medium, Validators.required),
    userId: new FormControl('', Validators.required)
  });

  orderStatuses = Object.values(OrderStatusNames);
  orderCategories = Object.values(OrderCategoryNames);
  orderPriorities = Object.values(OrderPriorityNames);

  filteredUsers$: Observable<User[]> = new Observable();
  allUsers: User[] = [];
  selectedUser: User | null = null;
  showUserDropdown: boolean = false;
  loggedUserId: string | null = null;

  totalPages: number = 0;
  currentPage: number = 1;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private userService: UserService,
    private authUserService: AuthUserService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loggedUserId = this.authUserService.getUserId();
    
    // Upewnij się że loggedUserId jest dostępny zanim wczytasz użytkowników
    if (this.loggedUserId) {
      this.loadUsers();
    } else {
      console.error('Nie udało się pobrać ID zalogowanego użytkownika');
    }
    
    this.loadOrdersByPage(1);
    this.setupUserAutocomplete();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('===== DEBUG USER LIST =====');
        console.log('Całkowita liczba pobranych użytkowników:', users.length);
        console.log('Wszyscy użytkownicy z backendu:', users);

        // Normalizuj ID - usuń spacje i zamień na lowercase
        const normalizedLoggedId = this.loggedUserId?.toLowerCase().trim();
        console.log('Zalogowany user ID (normalized):', normalizedLoggedId);

        // Dodatkowy filter aby upewnić się, że nie ma zalogowanego użytkownika
        this.allUsers = users.filter(u => {
          const normalizedUserId = u.id?.toLowerCase().trim();
          const isCurrentUser = normalizedUserId === normalizedLoggedId;

          if (!isCurrentUser) {
            console.log(`✓ Dodany: ${u.firstName} ${u.lastName} (${u.id})`);
          } else {
            console.log(`✗ Odfiltrowany (to Ty): ${u.firstName} ${u.lastName} (${u.id})`);
          }

          return !isCurrentUser;
        });

        console.log('Użytkownicy po filtrowaniu:', this.allUsers.length);
        console.log('=====================================');
      },
      error: (error) => {
        console.error('Błąd pobierania użytkowników:', error);
      }
    });
  }

  private setupUserAutocomplete(): void {
    const userControl = this.newOrder.get('userId');
    if (userControl) {
      this.filteredUsers$ = userControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterUsers(value ?? ''))
      );
    }
  }

  private filterUsers(searchValue: string): User[] {
    if (!searchValue.trim()) {
      return this.allUsers;
    }

    const searchLower = searchValue.toLowerCase().trim();
    return this.allUsers.filter(user => {
      const firstName = user.firstName ?? '';
      const lastName = user.lastName ?? '';
      const fullName = `${firstName} ${lastName}`;

      return (
        firstName.toLowerCase().includes(searchLower) ||
        lastName.toLowerCase().includes(searchLower) ||
        fullName.toLowerCase().includes(searchLower)
      );
    });
  }

  getUserDisplayName(user: User): string {
    const firstName = user.firstName ?? '';
    const lastName = user.lastName ?? '';
    return `${firstName} ${lastName}`.trim();
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
    this.newOrder.patchValue({
      userId: user.id ?? ''
    });
    this.showUserDropdown = false;
  }

  clearUserSelection(): void {
    this.selectedUser = null;
    this.newOrder.patchValue({
      userId: ''
    });
    this.showUserDropdown = false;
  }

  onUserInputFocus(): void {
    this.showUserDropdown = true;
  }

  onUserInputBlur(): void {
    setTimeout(() => {
      this.showUserDropdown = false;
    }, 200);
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
    if (this.newOrder.valid && this.selectedUser) {
      const createdOrder: Partial<Order> = {
        firstName: this.selectedUser.firstName ?? '',
        lastName: this.selectedUser.lastName ?? '',
        topic: this.newOrder.value.topic ?? '',
        status: Number(this.newOrder.value.status),
        category: Number(this.newOrder.value.category),
        priority: Number(this.newOrder.value.priority),
        receiverId: this.selectedUser.id ?? ''
      };
      this.orderService.addNewOrder(createdOrder).subscribe({
        next: (response) => {
          this.newOrder.reset();
          this.selectedUser = null;
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
