import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebserviceService } from '@app/_services/webservice.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteSalaryComponent {


  constructor(public dialogRef: MatDialogRef<DeleteSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public webservice: WebserviceService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(_id: string): void {
    this.webservice.deleteSalary(_id);
  }
}
