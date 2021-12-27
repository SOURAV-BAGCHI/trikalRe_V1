import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderConfirmData } from 'src/app/models/order-confirm-data';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderConfirmData,
    private fb:FormBuilder) {}

  insertForm:FormGroup;
  nameFormControl:FormControl;

  phoneFormControl:FormControl;

  emailFormControl:FormControl;

  ngOnInit():void
  {
    this.nameFormControl=new FormControl('',[
      Validators.required,
      Validators.maxLength(50)
    ]);
  
    this.phoneFormControl=new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.pattern("^[0-9]*$")
    ]);

    this.emailFormControl=new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.maxLength(350)
    ]);

    this.insertForm=this.fb.group({
      "nameFormControl":this.nameFormControl,
      "phoneFormControl":this.phoneFormControl,
      "emailFormControl":this.emailFormControl
    });

    // console.log(this.data);

  }

  isValid():boolean{
    if(this.data.type=='user')
    {
      return (this.emailFormControl.valid && this.phoneFormControl.valid && this.nameFormControl.valid);
    }
    else
    {
      return (this.phoneFormControl.valid && this.nameFormControl.valid);
    }
  }

  onNoClick(): void {
    // this.data.name=this.nameFormControl.value;
    // this.data.phone=this.phoneFormControl.value;
    // if(this.emailFormControl.valid)
    // {
    //   this.data.email=this.emailFormControl.value;
    // }
    // else if(this.data.type=='admin')
    // {
    //   this.data.email='NONE';
    // }
    // else
    // {
    //   this.data.email='NONE';
    // }

    this.data.name='';
    this.data.phone='';
    this.data.email='';
    

    this.dialogRef.close(this.data);
  //  this.dialogRef.close();
  }

  onSubmit():void{
    let userData=this.insertForm.value;
    this.data.name=userData.nameFormControl;
    this.data.phone=userData.phoneFormControl;
    if(this.data.type=='admin' && userData.emailFormControl.length==0)
    {
      this.data.email='NONE';
    }
    else
    {
      this.data.email=userData.emailFormControl;
    }

    this.dialogRef.close(this.data);
    // console.log(this.data);

  }


}
