import { Component, OnInit } from '@angular/core';
import { forkJoin, map, of, startWith, Subject, switchMap } from 'rxjs';
import { QuoteService, Quote } from './quote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  quotes: Quote[] = []
  refreshAll$ = new Subject();
  refreshOne$ = new Subject();

  constructor(readonly quoteService: QuoteService) { }

  ngOnInit(): void {
    this.refreshAll$.pipe(
      startWith(''),
      switchMap(() => {
        return forkJoin([this.quoteService.getQuote(), this.quoteService.getQuote(), this.quoteService.getQuote(), this.quoteService.getQuote(), this.quoteService.getQuote(), this.quoteService.getQuote()])
      })
    ).subscribe({
      next: (quotes: Quote[]) => {
        this.quotes = quotes;
      }
    });

    this.refreshOne$.pipe(
      switchMap((index) => {
        return forkJoin([this.quoteService.getQuote(), of(index)]);
      })
    ).subscribe({
      next: (event) => {
        const [quote, index] = event;
        this.quotes[index as number] = quote;
      }
    });
  }

  onRefresh(index: number) {
    this.refreshOne$.next(index);
  }

  onRefreshAll() {
    this.refreshAll$.next('');
  }

}
