import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { updateStudentRequest } from '../models/api-models/updateStudentRequest.model';
import { addStudentRequest } from '../models/api-models/addStudentRequest.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl='https://localhost:44381';
  constructor(private httpClient : HttpClient) { }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl+'/Students');
  }

  getStudent(studentId:string | null): Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl+'/students/'+studentId);
  }

  updateStudent(studentId:string, studentRequest:Student): Observable<Student>{
    const updateStudentRequest : updateStudentRequest={
        firstName :studentRequest.firstName,
        lastName:studentRequest.lastName,
        dateOfBirth:studentRequest.dateOfBirth,
        email:studentRequest.email,
        physicalAddress:studentRequest.address.physicalAddress,
        postalAddress:studentRequest.address.postalAddress,
        genderId:studentRequest.genderId,
        phoneNumber:studentRequest.phoneNumber
    }
    return this.httpClient.put<Student>(this.baseApiUrl+'/students/'+studentId,updateStudentRequest);
  }

  deleteStudent(studentId:string): Observable<Student>{

     return this.httpClient.delete<Student>(this.baseApiUrl+'/students/'+studentId);



  }
  addStudent(studentRequest:Student): Observable<Student>{
    const addStudentRequest : addStudentRequest={
        firstName :studentRequest.firstName,
        lastName:studentRequest.lastName,
        dateOfBirth:studentRequest.dateOfBirth,
        email:studentRequest.email,
        physicalAddress:studentRequest.address.physicalAddress,
        postalAddress:studentRequest.address.postalAddress,
        genderId:studentRequest.genderId,
        phoneNumber:studentRequest.phoneNumber
    }
    return this.httpClient.post<Student>(this.baseApiUrl+'/students/add',addStudentRequest);
  }
  getImagePath(relativePath: string)
  {
    return `${this.baseApiUrl}/${relativePath}`;
  }

  uploadImage(studentId:string,file:File): Observable<any>{
    const formData = new FormData();
    formData.append("profileImage",file);
    return this.httpClient.post(this.baseApiUrl+'/students/'+studentId+'/upload-image',formData,{
      responseType :'text'
    });
  }
}
