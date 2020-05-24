import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '/home';
  pages = [
    {
      title: 'Home',
      url: '/home'
    },
    {
      title: 'Profile',
      url: '/profile'
    }
  ]

  constructor(private router: Router) {
   this.router.events.pipe(
     filter((event: RouterEvent) => (event.url && event.url !== undefined && event.url !== '/'))
   ).subscribe((event: RouterEvent) => {
     this.selectedPath = event.url;
   })
  }

  ngOnInit() {
  }

}
