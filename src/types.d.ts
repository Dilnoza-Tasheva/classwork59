export interface BlogPost {
  id: number;
  title: string;
  author: string;
}

export interface APIPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface APIUser {
  id: number;
  name: string;
  email: string;
}