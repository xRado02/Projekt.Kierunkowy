import { OrderStatus, OrderPriority, OrderCategory } from '../../Enums/OrderEnums';

export interface Order {
  id?: string | null; 
  topic: string | null;
  firstName: string | null;
  lastName: string | null;
  status: OrderStatus | null;
  category: OrderCategory | null;
  priority: OrderPriority | null;
  date?: Date;
  receiverId?: string | null;
  receiverEmail: string | null;
}
