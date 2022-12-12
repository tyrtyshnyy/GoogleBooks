import axios, { AxiosError, AxiosResponse } from "axios";

import { Book } from "../types";
import { BookResults, GoogleBook, GoogleBooksAPI, GoogleBooksAPIResults } from "./types";

class GoogleBooks implements GoogleBooksAPI {
  public static ConvertGoogleBookToBook(book: GoogleBook): Book {
    let image = "https://via.placeholder.com/150";
    if (book.volumeInfo.imageLinks) {
      image = book.volumeInfo.imageLinks.extraLarge;
      if (typeof image === "undefined") {
        image = book.volumeInfo.imageLinks.large;
      }
      if (typeof image === "undefined") {
        image = book.volumeInfo.imageLinks.medium;
      }
      if (typeof image === "undefined") {
        image = book.volumeInfo.imageLinks.small;
      }
      if (typeof image === "undefined") {
        image = book.volumeInfo.imageLinks.smallThumbnail;
      }
      if (typeof image === "undefined") {
        image = book.volumeInfo.imageLinks.thumbnail;
      }

      console.log(image);
      
    }

    return {
      id: book.id,
      authors: book.volumeInfo.authors ? book.volumeInfo.authors : [],
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      publisher: book.volumeInfo.publisher,
      publishedDate: book.volumeInfo.publishedDate,
      image,
      link: book.volumeInfo.infoLink,
      rating: book.volumeInfo.averageRating,
      description: book.volumeInfo.description
    };
  }

  public static ConvertGoogleBooksToBooks(books: GoogleBook[]): Book[] {
    if (!books) return [];

    const convertedBooks: Book[] = [];

    for (const b of books) {
      convertedBooks.push(GoogleBooks.ConvertGoogleBookToBook(b));
    }

    return convertedBooks;
  }

  public static ConvertGoogleOneBookToOneBook(book: GoogleBook): Book {
    const convertedBooks: Book = GoogleBooks.ConvertGoogleBookToBook(book);
    return convertedBooks;
  }

  private readonly apiUrl = import.meta.env.VITE_URL_TO_BOOKS;
  private maxResults: number;
  private key: string | undefined;

  /**
   * @param key
   */
  public constructor(key?: string) {
    this.maxResults = 12;
    this.key = key;

    if (!this.hasKey()) {
      console.warn(
        "Google Books API initiated without an API Key. Quota restrictions and errors may occur."
      );
    }
  }

  /**
   * @return {boolean}
   */
  public hasKey(): boolean {
    return typeof this.key === "string";
  }

  /**
   * @return {string | undefined}
   */
  public getKey(): string | undefined {
    return this.key;
  }

  /**
   * @param query
   * @return {Promise<Book[] | never>}
   */
  public getAll(
    query: string,
    category: string = "",
    sort: string = "relevance",
    startIndex: number = 0
  ): Promise<BookResults | never> {
    const url = `${this.apiUrl}?q=${encodeURI(
      query
    )}+subject:${category}&maxResults=${
      this.maxResults
    }&orderBy=${sort}&startIndex=${startIndex}${
      this.hasKey() ? "&key=" + this.getKey() : ""
    }`;

    console.debug(`Google Books API request ${url} is starting`);

    return axios
      .get<GoogleBooksAPIResults>(url)
      .then((res: AxiosResponse<GoogleBooksAPIResults>): BookResults => {
        return {
          totalItems: res.data.totalItems,
          books: GoogleBooks.ConvertGoogleBooksToBooks(res.data.items),
        };
      })
      .catch((axiosError: AxiosError): Promise<never> => {
        // console.error(axiosError.name, axiosError.message);
        return Promise.reject(axiosError);
      })
      .finally((): void => {
        console.debug(`Google Books API request ${url} has finalised`);
      });
  }

  public getBookId(id: string): Promise<Book | never> {
    return axios
      .get<GoogleBook>(`${this.apiUrl}/${id}`)
      .then((res: AxiosResponse<GoogleBook>): Book => {
        return GoogleBooks.ConvertGoogleOneBookToOneBook(res.data);
      })
      .catch((axiosError: AxiosError): Promise<never> => {
        console.error(axiosError.name, axiosError.message);
        return Promise.reject(axiosError);
      })
      .finally((): void => {
        console.debug(`Google Books API request ${id} has finalised`);
      });
  }
}

export const bookApi = new GoogleBooks(import.meta.env.VITE_API_KEY);
