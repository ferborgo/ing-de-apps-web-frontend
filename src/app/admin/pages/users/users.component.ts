import { Component, OnInit } from '@angular/core';
import { UserControllerService } from 'destino';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'email', 'admin', 'buttons'];
  dataSource;

  constructor(
    private service: UserControllerService
  ) { }

  ngOnInit() {
    this.service.userControllerGetUsers().subscribe(
      response => {
        console.log(response);
        this.dataSource = response;
      }
    );
  }

}
