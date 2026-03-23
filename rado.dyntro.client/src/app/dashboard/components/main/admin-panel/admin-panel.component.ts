import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { Role, UserRoleNames } from '../../../Enums/UserEnums';
import { User } from '../../../models/user/user-model';

@Component({
  selector: 'admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {

  @ViewChild('searchByUser') searchByUser!: ElementRef;

  newUser = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)    
  });

  public Role = Role;
  public RoleNames = UserRoleNames;
  public users: User[] = [];
  public isActivated: boolean = true;
  public filteredUsers: User[] = [];
  selectedUserIds: string[] = [];
  selectAllCheckbox: boolean = false;
  searchedUser = '';
  isLoading?: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadUsers();
    
   
  
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        
      }
    });
  }

  loadUsersByParams(name: string): void {
    this.userService.getUserByParams(name).subscribe({
      next: (users) => {
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSearchedUser(): void {
    this.searchedUser = this.searchByUser.nativeElement.value;
    this.loadUsersByParams(this.searchedUser);
  }

  createNewUser(): void {
    if (this.newUser.valid) {
      const createdUser: Partial<User> = {
        firstName: this.newUser.value.firstName,
        lastName: this.newUser.value.lastName,
        email: this.newUser.value.email,
        role: this.newUser.value.role,        
      };
      this.userService.addNewUser(createdUser).subscribe({
        next: (response) => {          
          this.loadUsers();
          this.sendInviteEmail(response);
          console.log("Rola:", createdUser.role);
        },
        error: (error) => {
          console.error("Błąd dodawania użytkownika", error);          
          console.error("Rola:", createdUser.role);
        }
      });
    } else {
      console.log("Formularz jest niepoprawny!");
    }
  }

  sendInviteEmail(user: Partial<User>): void {
    this.userService.sendInviteEmail(user).subscribe({
      next: (response) => {
        console.log("Wysłano maila")
      },
      error: (error) => {
        console.error("Błąd przy wysłaniu zaproszenia")
        console.log("Szczegóły błędu:", error.error.errors);
      }
    })
  }


  deleteUsers(): void {
    this.userService.deleteUsers(this.selectedUserIds).subscribe({
      next: (response) => {
        console.log("Wybrani użytkownicy zostali usunięci");
        this.selectedUserIds = [];
        this.selectAllCheckbox = false;
        this.loadUsers();
      },
      error: (error) => {
        console.error("Błąd podczas usuwania użytkowników", error);
      }
    });
  }

  toogleSelection(userId: string, checked: boolean): void {
    if (checked) {
      this.selectedUserIds.push(userId);
    } else {
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId);
    }
    this.updateSelectAllCheckboxState();
  }

  toogleSelectionAll(): void {
    this.selectAllCheckbox = !this.selectAllCheckbox;
    if (this.selectAllCheckbox) {
      this.selectedUserIds = this.users.map(user => user.id!).filter(id => id !== undefined) as string[];
    } else {
      this.selectedUserIds = [];
    }
  }

  isSelected(userId: string): boolean {
    return this.selectedUserIds.includes(userId);
  }

  getCheckboxChecked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  updateSelectAllCheckboxState(): void {
    this.selectAllCheckbox = this.users.length > 0 && this.users.every(user => user.id !== undefined && this.selectedUserIds.includes(user.id));
  }










}
