import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UsersService } from '../services/users.service';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule,CommonModule,HttpClientModule,MatPaginatorModule,MatCardModule],
  providers: [UsersService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['First name', 'Last name', 'Email', 'Profile picture'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  totalRecords: number = 50;
  result: any;
  pageSize: number= 5;
  pageEvent: any;
  selectedUser:any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private userService:UsersService){}
  ngOnInit(){
    this.getUsersList()

  }


  getUsersList(page:number = 1, limit:number = 500){
    this.userService.getUsers(page,limit).subscribe((res:any) => {
      let oldRes = this.dataSource.data;
      let newRes = [...oldRes, ...res];

      this.dataSource = new MatTableDataSource(newRes);
      this.dataSource.paginator = this.paginator;
    })
  }


  
  onPaginateChange(event: any) {
    console.log(event);
    console.log(Math.ceil(this.totalRecords / this.pageSize) - 1);
    if (event.pageIndex == Math.ceil(this.totalRecords / this.pageSize) - 1) {
      console.log("API call");

      this.getUsersList(event.pageIndex,this.pageSize)

    }
  }
}
