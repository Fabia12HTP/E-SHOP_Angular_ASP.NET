export interface User {
  id: string;
  bio?: string;
  email: string;
  username: string;
  displayName?: string;
  twoFactorEnabled: boolean;
  profilePicturePath?: string;
}
