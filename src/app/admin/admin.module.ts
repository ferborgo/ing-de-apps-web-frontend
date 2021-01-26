import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule { }