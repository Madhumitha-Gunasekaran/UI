import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() newSearchEvent = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void { }

  search(e: any) { // onEnter send the value to parent component(app.component.ts)
    if (e.target.value) {
      this.newSearchEvent.emit(e.target.value);
    }
    else {
      alert('Please provide input')
    }
  }
}
