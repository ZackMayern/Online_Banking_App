import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public users:any = [];
  constructor(private auth : AuthService){

  }
  
  logout(){
    this.auth.signOut();
  }
}
