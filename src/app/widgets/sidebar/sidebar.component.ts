import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  updatedMins = 1;
  totalNoOfCases = 1023280;
  totalActiveCases = 11231;
  totalRecoveredCases = 1231231;
  totalFatalCases = 22;
  changeASymbol = '+';
  changeRSymbol = '+';
  changeFSymbol = '+';
  changeInACases = 2132;
  changeInRCases = 2312;
  changeInFCases = 1;
  updateTimeUnits = 'min';

  constructor() { }

  ngOnInit(): void {
  }

}
