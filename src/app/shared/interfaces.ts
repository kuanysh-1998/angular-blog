export class IUser {
  email!: string;
  password!: string;
  returnSecureToken?: boolean;
}

export interface IFbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface IPost {
  id?: string;
  title: string;
  author: string;
  content: string;
  date: Date;
}
