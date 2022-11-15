import { Component , OnInit} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ApiService } from './services/api.service';
import { Form } from './Type/Type';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'API-Integration';
  constructor(private apiService:ApiService){}

  getData:any = []

  updateData :any = [
    {
      firstName : '',
      lastName : '',
      email : '',
      title  : '',
      picture  : ''

    }
  ]

  form = new FormGroup({
    firstName : new FormControl(),
    lastName : new FormControl(),
    title : new FormControl(),
    email : new FormControl(),
    picture : new FormControl()
  })

  formValid = false



  generateData(){
    this.apiService.getData().subscribe((x:any)=>{
      this.getData = x.data
      console.log(this.getData)
    })  
  }
  addUser(val:any){
    this.apiService.PostData(val).subscribe((x)=>this.generateData())
    this.form.reset()
  }
  
  deleteUser(id:any){
    this.apiService.deleteData(id).subscribe((x)=> this.generateData())
  }
  
  editItem(data:any){
    this.updateData.id = data.id
    this.form.controls['firstName'].setValue(data.firstName)
    this.form.controls['lastName'].setValue(data.lastName)
    this.form.controls['title'].setValue(data.title)
    this.form.controls['picture'].setValue(data.picture)
    document.getElementById("title")?.focus();
  }


  
  updateItem(){
      this.updateData.title = this.form.value.title
      this.updateData.firstName = this.form.value.firstName
      this.updateData.lastName = this.form.value.lastName
      this.updateData.picture= this.form.value.picture
      this.apiService.updateData(this.updateData,this.updateData.id).subscribe((x)=>{
      this.generateData()
      })
  }
  
  ngOnInit(){
    this.generateData()
  }
}
