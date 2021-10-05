import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Statistic } from "../entities/statistic";

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {
  statistics: any

  constructor(public firestore: AngularFirestore) {
    this.readStatistics().subscribe(res => this.statistics = res);
  }

  createStatistic(statistic: Statistic){
    return this.firestore.collection('statistics').add(statistic);
  }

  readStatistics(){
    return this.firestore.collection('statistics').snapshotChanges();
  }

}
