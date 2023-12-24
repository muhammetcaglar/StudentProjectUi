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
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','phoneNumber','edit','gender.description'];
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
        this.dataSource.sortingDataAccessor=(item,property)=>{
          switch(property){
            case 'gender.description':return item.gender.description;
            default: return property;
          }
        };

        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      (error)=>{

      }
    )
  }

  filterStudents(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate=(data,filter)=>{
      return data.gender.description.toLocaleLowerCase().includes(filter)
      || data.firstName.toLocaleLowerCase().includes(filter)
      || data.lastName.toLocaleLowerCase().includes(filter)
      || data.dateOfBirth.substring(0,10).includes(filter)
      || data.email.toLocaleLowerCase().includes(filter)
      || data.phoneNumber.toString().includes(filter)
    };
  }
}
