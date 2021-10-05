import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Record } from "../entities/record";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RecordsService {
  records: any

  constructor(public firestore: AngularFirestore) {
    this.readRecords().subscribe(res => this.records = res);
  }

  readRecords(){
    return this.firestore.collection('records').snapshotChanges();
  }

  createRecord(record: Record){
    return this.firestore.collection('records').add(record);
  }

  updateRecord(id: any, data: any){
    return this.firestore.collection("records")
      .doc(id)
      .set(data, { merge: true });
  }
}
