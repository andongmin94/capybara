export type Article = {
  id: number;
  like_users: User[];
  user: User;
  title: string;
  content: string;
  image?: HTMLImageElement | string | File;
  created_at: Date;
  updated_at: Date;
};

export type Comment = {
  article: Article;
  user: User;
  content: string;
  like_users: User[];
  created_at: Date;
  updated_at: Date;
};

export type User = {
  // Define properties for user if not already defined
};
