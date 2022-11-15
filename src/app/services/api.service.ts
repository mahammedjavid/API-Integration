import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http:HttpClient) {}


  httpHeader = new HttpHeaders({
    'app-id' : '63733f1d0fde3e744bb80fc4'
  })


  getData(){
    return this.http.get('https://dummyapi.io/data/v1/user?page=1&limit=100',{headers:this.httpHeader})
  }
  PostData(data:any){
    return this.http.post<any[]>('https://dummyapi.io/data/v1/user/create',data,{headers:this.httpHeader})
  }
  deleteData(id:number){
    return this.http.delete('https://dummyapi.io/data/v1/user/'+id,{headers:this.httpHeader})}

  updateData(data:any,id:any){
    return this.http.put<any>('https://dummyapi.io/data/v1/user/'+id,data,{headers:this.httpHeader})
  }
}
