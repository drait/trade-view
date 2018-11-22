import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  tradesCollection: AngularFirestoreCollection<Trade>;

  constructor(public data: TradesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.data.getTrades().subscribe(
      (trades: Trade[]) => {
        this.trades = trades;
        console.log(this.trades);
      }
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.tradeForm.value);
  }
}
