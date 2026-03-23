import { Role } from '../../Enums/UserEnums';

export interface User {
  id?: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
  isActivated: boolean | null;
}


