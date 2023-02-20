import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '../types/Dialog';

@Component({
  selector: 'radancytestapp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  outputValue!: string;
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog,
  ) {

  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm() {
    this.dialogRef.close(this.outputValue);
  }
}
