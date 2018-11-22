import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trade } from './trade';

@Injectable({
  providedIn: 'root'
})
export class TradesService {
  tradescollection: AngularFirestoreCollection<Trade>;
  trades: Observable<Trade[]>;
  tradeDoc: AngularFirestoreDocument<Trade>;
  
  constructor(public afs: AngularFirestore) {
    this.tradescollection = this.afs.collection('Trades', x => x.orderBy('Pick', 'asc'));
    this.trades = this.tradescollection.snapshotChanges().pipe(map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as Trade;
            data.id = a.payload.doc.id;
            return data;
          });
      }));
  }
  getTrades() {
    return this.trades;
  }
  addTrade(trade) {
    this.tradescollection.add(trade);
  }
  deleteTrade(trade) {
    this.tradeDoc = this.afs.doc(`Trades/${trade.id}`);
    this.tradeDoc.delete();
  }
}