import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

import {DateService} from '../shared/date.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar: Week;

  constructor(private dateService: DateService) {
  }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  private generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');

    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
          })
      });
    }
  }
}
