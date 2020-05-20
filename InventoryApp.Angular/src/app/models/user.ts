/* Defines the product entity */
export interface User {
  id: number;
  username: string;
  password: string;
  dateOfBirth: string;
  city: string;
  country: string;
  roles?: string[];
}

