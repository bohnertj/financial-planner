import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebserviceService } from '@app/_services/webservice.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

 
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public webservice: WebserviceService) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(_id: string): void {

  console.log('Jetzt wird die ID gelöscht' + _id);
this.webservice.delteInvoices(_id);
//this.dataService.deleteIssue(this.data.id);
}
}
