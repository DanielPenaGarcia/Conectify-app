import { Provider } from "@app/shared/enums/provider.enum";

export interface SignUpData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserCreated {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  provider: Provider;
  createdAt: string;
  updatedAt: string;
}
