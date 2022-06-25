import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-day-grid',
  templateUrl: './day-grid.component.html',
  styleUrls: ['./day-grid.component.css'],
})
export class DayGridComponent implements OnInit {
  public dayHours: Array<any> = new Array();
  @Output()
  hourChanged: EventEmitter<string> = new EventEmitter();
  public gridStyle: any;

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i <= 23; i++) {
      //hourObj.heure=i.toString().length==1?'0'+i+':00':i+':00';
      this.dayHours.push({
        heure: i.toString().length == 1 ? '0' + i + ':00' : i + ':00',
        class: 'disabled-grid',
      });
    }
  }

  pickHour(event: Event): void {
    let elementId: string = (event.currentTarget as Element).id;
    let dayHoursList = new Array();
    for (let hour of this.dayHours) {
      if (hour.heure == elementId) {
        dayHoursList.push({ heure: hour.heure, class: 'selected-grid' });
      } else {
        dayHoursList.push({ heure: hour.heure, class: hour.class=='selected-grid'?'enabled-grid':hour.class });
      }
    }
    this.dayHours = dayHoursList;
    this.hourChanged.emit(elementId);
    console.log('dd', elementId);
  }
}
