export interface IUserModelData {
  username: string;
  email: string;
  picture: string | null;
  lastSeen: string;
  password: string;
  refreshToken: string;
  generateRefreshToken: any;
  generateAccessToken: any;
  getPublicFields: any;
}
