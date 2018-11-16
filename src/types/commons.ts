export interface LoginErrorResponse {
  status: string | 'newPassword';
  message?: string;
  requiredFields?: string[];
}

export interface ErrorResponse {
  status: string;
  message?: string;
}

export interface App {
  appPage: string;
  contact_email: string;
  description: string;
  icon: string;
  id: number;
  images: Array<{}>;
  manifest_url: string;
  name: string;
  publisher: string;
  signature: string;
  support_email: string | null;
  title: string;
}

export interface User {
  email: string;
  firstName: string;
  id: number;
  isAdmin: boolean;
  lastName: string;
  middleInitial: string;
  organizationId: string;
  username: string;
}

export enum LauncherPosition {
  Top = 'TOP',
  Right = 'RIGHT',
  Bottom = 'BOTTOM',
  Left = 'LEFT',
}
