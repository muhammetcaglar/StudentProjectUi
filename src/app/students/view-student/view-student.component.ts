import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from './services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      profileImageUrl:'',
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
    isNewStudent=false;
    header="";
    displayProfileImageUrl='';
    constructor(private readonly studentService:StudentService,
      private readonly genderService:GenderService,
      private readonly route:ActivatedRoute,
      private router : Router,
      private snackbar: MatSnackBar
      ){

    }


    ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params) =>{
          this.studentId = params.get('id');

          if(this.studentId==="add"){
              this.isNewStudent=true;
              this.header="Öğrenci Ekle";
              this.setImage();
          }
          else{
              this.isNewStudent=false;
              this.header="Öğrenci Düzenle";
              this.studentService.getStudent(this.studentId).subscribe(
                (success)=>{
                    this.student=success;
                    this.setImage();
                },
                (error)=>{
                    this.setImage();
                }
              )
          }

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
  onUpdate(){
    debugger;
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (success)=>{
        debugger;
        this.snackbar.open('Öğrenci bilgileri güncellendi',undefined,{
          duration:2500
        })
        this.router.navigateByUrl('students');
      },
      (error)=>{
        this.snackbar.open('Öğrenci bilgileri güncellenemedi!',undefined,{
          duration:2500
        })
      }
    )
  }
  onDelete(){
        this.studentService.deleteStudent(this.student.id).subscribe(
          (success)=>{
            this.snackbar.open('Öğrenci başarılı bir şekilde silindi.',undefined,{
              duration:2500
            })
            setTimeout(() => {
              this.router.navigateByUrl('students');
            }, 2000);

          },
          (error)=>{
            this.snackbar.open('Öğrenci silme işlemi başarısız!',undefined,{
              duration:2500
            })
          }
        )
  }
  onAdd(){
    this.studentService.addStudent(this.student)
    .subscribe(
      (success)=>{
        debugger;
        this.snackbar.open('Öğrenci kayıt işlemi gerçekleşti',undefined,{
          duration:2500
        }),
        setTimeout(() => {
          this.router.navigateByUrl(`students/${success.id}`);
        })
      },

      (error)=>{
        this.snackbar.open('Öğrenci kayıt işlemi gerçekleştirilemedi!',undefined,{
          duration:2500
        })
      }
    )
  }

  setImage()
  {
    if(this.student.profileImageUrl)
    {
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
    }
    else
    {
      this.displayProfileImageUrl ='/assets/user.png';
    }
  }
  uploadImage(event: any){
        if(this.studentId){
          const file : File = event.target.files[0];
          this.studentService.uploadImage(this.student.id,file).subscribe(
            (success) =>{
              this.student.profileImageUrl=success;
              this.setImage();
              this.snackbar.open('Öğrenci resmi eklendi',undefined,{
                duration:2500
              })
            },
            (error)=>{
              this.snackbar.open('Öğrenci resmi eklenemedi',undefined,{
                duration:2500
              })
            }
          )
        }
  }
}
