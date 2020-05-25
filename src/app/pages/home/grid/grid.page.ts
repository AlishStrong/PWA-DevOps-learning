import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {
  places: Place[] = [
    { title: `Alisher's` },
    { title: `Peppi's` },
    { title: `Paulina and co.` },
    { title: `Matisserie` },
    { title: `Lebanon delights` },
    { title: `Viihdemaa` },
    { title: `Movie nation` },
    { title: `Sea adventures` },
    { title: `Sailor's bar` },
    { title: `Seven friends` },
    { title: `Vegicious` },
    { title: `Body+` },
    { title: `Laser polygon` },
    { title: `Music bar` },
    { title: `Karaoke, chill and bar` },
    { title: 'Dupligo' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

export interface Place {
  title: string
}