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
  title = 'crud';
  constructor(private apiService:ApiService){}

  postData:Form = new Form()
  getData:any = []

  form = new FormGroup({
    name : new FormControl(),
    place : new FormControl(),
    id : new FormControl()
  })

  formValid = false


  onSubmit(){
    this.postData.name = this.form.value.name
    this.postData.place = this.form.value.place

    this.apiService.PostData(this.postData).subscribe((x)=>{
      console.log(x)
      alert('Your information are added to server')
      this.form.reset()
      this.generateData()
    })
  }

  generateData(){
    this.apiService.getData().subscribe((x)=> this.getData = x)  
  }

  ngOnInit(){
    this.generateData()
  }
  deleteItem(id:number){
    this.apiService.deleteData(id).subscribe((x)=> this.generateData())
    // this.generateData()
  }

  editItem(data:Form){
    this.formValid = true
    console.log(data)
    this.form.controls['name'].setValue(data.name)
    this.form.controls['place'].setValue(data.place)

  }
  updateItem(data:any){
    this.postData.name = this.form.value.name
    this.postData.place = this.form.value.place
    this.generateData()
    this.apiService.updateData(this.postData,data.id).subscribe((x)=>x)
    this.generateData()
    this.formValid = false
  }

}
