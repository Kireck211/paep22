import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Subject, switchMap } from 'rxjs';
import { QuoteService, Quote } from './quote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  quotes: Quote[] = []
  refreshAll$ = new Subject();

  constructor(readonly quoteService: QuoteService) { }

  ngOnInit(): void {
    this.refreshAll$.pipe(
      switchMap(() => {
        return forkJoin([this.quoteService.getQuote(), this.quoteService.getQuote(), this.quoteService.getQuote()])
      })
    ).subscribe({
      next: (quotes: Quote[]) => {
        this.quotes = quotes;
      }
    })
  }

  onRefresh() {
    console.log('clicked');
  }

  onRefreshAll() {
    this.refreshAll$.next('');
  }

}
