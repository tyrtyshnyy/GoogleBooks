
export type User = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};


export type Book = {
  authors: string[];
  title: string;
  subtitle: string;
  publisher: string;
  publishedDate: string;
  image: string | undefined;
  link: string;
  rating: number;
}


