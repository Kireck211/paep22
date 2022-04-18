import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

export interface Quote {
  author: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  constructor(private readonly http: HttpClient) { }

  getQuote(): Observable<Quote> {
    return this.http.get<Quote>('https://api.quotable.io/random?tags=famous-quotes');
  }
}
