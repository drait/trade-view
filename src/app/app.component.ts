import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Trade } from './trade';
import { TradesService } from './trades.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  trades: Trade[] = [];
  tradeForm = this.fb.group({
    pick: ['', Validators.required],
    buy: ['', Validators.required],
    sell: ['']
  });

  constructor(public tradeService: TradesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.tradeService.getTrades().subscribe(
      (trades: Trade[]) => {
        this.trades = trades;
        console.log(this.trades);
      }
    );
  }

  onSubmit(value) {
    this.tradeService.addTrade({
      "pick": value.pick,
      "buy": value.buy,
      "sell": value.sell
    });
  }

  delete(trade) {
    console.log(trade.id);
    this.tradeService.deleteTrade(trade);
  }
}
