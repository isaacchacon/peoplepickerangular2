import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Employee } from './employee';
import { ListService } from './list.service';

@Component({
    selector: 'people-picker',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  empTitle: string = null;
  selectedEmp: Employee = null;

  items: Observable<Employee[]>;
  private searchTermStream = new Subject<string>();

  private toTitleCase(term: string) {
    return term.replace(/\w\S*/g, (term) => { return term.charAt(0).toUpperCase() + term.substr(1).toLowerCase(); });
  }

  search(term: string) {
    this.searchTermStream.next(this.toTitleCase(term));
  }

  constructor(private listService: ListService) {
    this.items = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.listService.search(term));
  }

  setEmployee(emp: Employee) {
    this.selectedEmp = emp;
    this.empTitle = this.selectedEmp.Title;
    this.search(this.selectedEmp.Title);
  }
}
