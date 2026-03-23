import { OrderStatus, OrderPriority, OrderCategory } from '../../Enums/OrderEnums';

export interface OrderDetails {
  id: string; 
  status: OrderStatus | null;
  topic: string | null;
  category: OrderCategory | null;
  priority: OrderPriority | null;
  date: Date; 
 
  contactFirstName: string | null;
  contactLastName: string | null; 
  contactEmail: string | null;
}
