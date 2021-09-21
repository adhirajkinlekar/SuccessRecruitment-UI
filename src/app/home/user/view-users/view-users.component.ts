import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {


  users = [];
  filteredUsers = [];
  constructor(private route:ActivatedRoute) { 
    this.users = this.route.snapshot.data['users'].$values;
    if(this.users){
      this.filterUsers('');
    }
  }

  ngOnInit(): void {
  }

  filterUsers(value){
    this.filteredUsers = this.users.filter((user)=>{
      return user.userName.toLowerCase().includes(value.toLowerCase()) ||
      user.roleName.toLowerCase().includes(value.toLowerCase()) || 
      user.phone.toLowerCase().includes(value.toLowerCase()) || 
      user.email.toLowerCase().includes(value.toLowerCase())
    })
  }
}
