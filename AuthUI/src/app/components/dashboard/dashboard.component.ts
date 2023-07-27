import { UserStoreService } from './../../services/user-store.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public users:any = [];
  public fullName:string = "";
  public role:string = "";
  constructor(private auth : AuthService, private api:ApiService, private userStore : UserStoreService, private router : Router){

  }
  
  ngOnInit(){
    this.api.getUsers().subscribe(res=>{
      this.users=res;
    });
    this.userStore.getFullNameFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getRoleFromStore().subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  checkBookOrder(){
    this.router.navigate(['/checkbookorder'])
  }

  logout(){
    this.auth.signOut();
  }
}
