import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from './services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent  implements OnInit{

    studentId:string | null | undefined;
    student: Student = {
      id:'',
      firstName:'',
      lastName:'',
      dateOfBirth:'',
      email:'',
      phoneNumber:0,
      genderId:'',
      profileImgUrl:'',
      gender:{
        id:'',
        description:''
      },
      address:{
        id:'',
        physicalAddress:'',
        postalAddress:''
      }

    };
    genderList : Gender[] = [];

    constructor(private readonly studentService:StudentService,
      private readonly genderService:GenderService,
      private readonly route:ActivatedRoute
      ){

    }


    ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params) =>{
          this.studentId = params.get('id');
          this.studentService.getStudent(this.studentId).subscribe(
          (success)=>{
              this.student=success;
          },
          (error)=>{

          }
        ),
        this.genderService.getGenderList().subscribe(
          (success)=>{
              this.genderList=success;
          },
          (error)=>{

          }
        )


    }
    )
  }
}
