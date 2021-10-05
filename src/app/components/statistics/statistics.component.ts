import { Component, OnInit } from '@angular/core';
import {RecordsService} from "../../service/records.service";
import {StatisticsService} from "../../service/statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  host: {
    class: 'content'
  }
})
export class StatisticsComponent implements OnInit {

  constructor(public SS: StatisticsService) {

  }

  ngOnInit(): void {
  }

}
