import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {
  places: Place[] = [
    {
      title: `Alisher's`,
      img: 'alishers'
    },
    { title: `Peppi's`, img: 'peppis' },
    { title: `Paulina and co.`, img: 'paulina_and_co' },
    { title: `Matisserie`, img: 'matisserie' },
    { title: `Lebanon delights`, img: 'lebanon_delights' },
    { title: `Viihdemaa`, img: 'viihdemaa' },
    { title: `Movie nation`, img: 'movie_nation' },
    { title: `Sea adventures`, img: 'sea_adventures' },
    { title: `Sailor's bar`, img: 'sailors_bar' },
    { title: `Seven friends`, img: 'seven_friends' },
    { title: `Vegicious`, img: 'vegicious' },
    { title: `Body+`, img: 'body_plus' },
    { title: `Laser polygon`, img: 'laser_polygon' },
    { title: `Music bar`, img: 'music_bar' },
    { title: `Karaoke, chill and bar`, img: 'karaoke_chill_and_bar' },
    { title: 'Dupligo', img: 'dupligo' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

export interface Place {
  title: string,
  img: string
}