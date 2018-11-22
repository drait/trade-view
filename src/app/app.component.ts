import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

interface Trade {
  Pick: string;
  Buy: Date;
  Sell: Date;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tradeForm = this.fb.group({
    pick: ['', Validators.required],
    buy: ['', Validators.required],
    sell: ['']
  });
  tradesCollection: AngularFirestoreCollection<Trade>;
  trades: Observable<Trade[]>

  constructor(private afs: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit() {
    this.tradesCollection = this.afs.collection('trades');
    this.trades = this.tradesCollection.valueChanges();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.tradeForm.value);
  }
}
