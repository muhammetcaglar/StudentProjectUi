import { Component, OnInit,ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../models/ui-models/student.model';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  students:Student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','phoneNumber','gender'];
  dataSource:MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  filterString='';
  constructor(private studentService:StudentService) {

  }
  ngOnInit(): void {
    debugger;
    this.studentService.getStudents().subscribe(
      (success)=>{
        this.students= success;
        this.dataSource= new MatTableDataSource<Student>(this.students);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      (err)=>{

      }
    )
  }
  filterStudents(){
    this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
  }
}
