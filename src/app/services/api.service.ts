import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http:HttpClient) {}

  PostData(data:any){
    return this.http.post<any[]>('http://localhost:3000/posts',data).pipe(map((x:any)=> { return x}))
  }

  getData(){
    return this.http.get('http://localhost:3000/posts').pipe(map((x:any)=>{return x}))
  }
  updateData(data:any,id:any){
    return this.http.put<any>('http://localhost:3000/posts/'+id,data).pipe(map((x:any)=>{return x}))
  }
  deleteData(id:number){
    return this.http.delete('http://localhost:3000/posts/'+id).pipe(map((x:any)=>{return x}))
  }
}
