import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

declare var jQuery:any;
declare var M:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails:any;
  selectedUser: any;
  editUser:any;
  constructor(private userService: UserService, private router: Router) {
    this.selectedUser = { _id:'',fullName:'',email:'',password:'',contact:'',experience:''};
    //this.editUser = { _id:'',fullName:'',email:'',password:'',contact:'',experience:''};
    this.userDetails = {id:'',fullName:'',email:'',password:'',contact:'',experience:''};

   }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails._id);
      },
      err => { 
        console.log(err);
        
      }
    );

  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  showEditPopup(userDetails){
    this.editUser = userDetails;
    jQuery('#userModel').modal('show');
  }
  
  updateEmp() {
    console.log(this.userDetails);
    this.userService.putUser(this.userDetails).subscribe(res => {
      this.refreshUserProfile();
    M.toast({ html: 'Updated successfully!', classes: 'rounded' });
    });
  }
  
  refreshUserProfile() {
    this.userService.getUserProfile().subscribe(res => {
      this.userDetails = res['user'];
    },
    err => { 
      console.log(err);
      
    }
  );
  }

}