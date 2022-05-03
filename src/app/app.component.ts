import { AppService } from './app.service';
import { ServerModel } from './interface/server-model';
import { ServerStatus } from './enum/server-status.enum';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'server-manager';
  isVisible = false;
  isConfirmLoading = false;
  listOfServer: ServerModel [] =[] ;
  validateForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private appService:AppService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      serverIpAddress: [null, [Validators.required]],
      serverName: [null],
      serverLocation: [null],
      serverStatus: [null, [Validators.required]]
    });

    this.appService.getAllServer().subscribe(
      data => {
        this.listOfServer = data;
        console.log(data)
      }
    );
    }

    /* listOfData: ServerModel[] = [
    {
      id: 1,
      serverIpAddress: 'John Brown',
      serverName: "sfsd",
      serverLocation: 'New York No. 1 Lake Park',
      serverStatus: ServerStatus.SERVER_UP 
    },
    {
      id: 2,
      serverIpAddress: 'John Brown',
      serverName: "sfsd",
      serverLocation: 'New York No. 1 Lake Park',
      serverStatus: ServerStatus.SERVER_UP 
    },
    {
      id: 3,
      serverIpAddress: 'John Brown',
      serverName: "sfsd",
      serverLocation: 'New York No. 1 Lake Park',
      serverStatus: ServerStatus.SERVER_UP 
    },
    {
      id: 4,
      serverIpAddress: 'John Brown',
      serverName: "sfsd",
      serverLocation: 'New York No. 1 Lake Park',
      serverStatus: ServerStatus.SERVER_UP 
    }
  ]; 
  */

  showAddServerModal(){
    this.isVisible = true;
  }

  addSerever(){
    this.isVisible = false;
    this.isConfirmLoading = false;
    //console.log('submit', this.validateForm.value);
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.appService.addServer(this.validateForm.value)
      .subscribe(res=>{
        console.log(res);
        this.listOfServer = [... this.listOfServer,this.validateForm.value]
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancelModal(){
    this.isVisible = false;
  }

  submitForm(): void {

  }

  deleteServer(id: number): void{
    this.appService.deleteServer(id)
    .subscribe(res=>{
       console.log(res);
    });
  }

  pingServer(ip: String): void{
    console.log(ip);
    this.appService.pingServer(ip)
    .subscribe(res=>{
      console.log(res);
      this.listOfServer.map(server =>{ 
        server.serverStatus = res.serverIpAddress === server.serverIpAddress ? res.serverStatus : server.serverStatus;
      });
      this.listOfServer = [...this.listOfServer];
    });
  }
  serverStatusChange(value: string): void {
    //this.validateForm.get('note')!.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }
}
