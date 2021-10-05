import { Component, OnInit } from '@angular/core';
import { RecordsService } from "../../service/records.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  host: {
    class: 'content'
  }
})
export class RecordsComponent implements OnInit {
  constructor(public RS: RecordsService) { }

  ngOnInit(): void {
  }

}
