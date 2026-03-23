import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from '../../components/main/main.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardComponent } from '../../dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavigationComponent } from '../../components/header/navigation/navigation.component';
import { OrdersFilterComponent } from '../../components/main/orders-filter/orders-filter.component';
import { OrdersComponent } from '../../components/main/orders/orders.component';
import { FormsModule } from '@angular/forms'; 
import { ProfileDetailsComponent } from '../../components/main/profile-details/profile-details.component';
import { OrderService } from '../../Services/order.service';
import { AdminPanelComponent } from '../../components/main/admin-panel/admin-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { OrderDetailsComponent } from '../../components/main/order-details/order-details.component';
import { MessageService } from '../../Services/message.service';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    NavigationComponent,
    OrdersFilterComponent,
    OrdersComponent,   
    AdminPanelComponent,
    ProfileDetailsComponent,
    OrderDetailsComponent     
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [OrderService, UserService, MessageService],
  exports: [
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    NavigationComponent,
    OrdersFilterComponent,
    OrdersComponent,
    AdminPanelComponent,
    ProfileDetailsComponent,
    OrderDetailsComponent
   

  ]
})
export class DashboardModule { }
