import { Component, OnInit } from '@angular/core';
import { UsersService } from '@eshopapp/users';

@Component({
  selector: 'eshopapp-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
      this.usersService.initAppSession();
  }

  title = 'eshop';
}
