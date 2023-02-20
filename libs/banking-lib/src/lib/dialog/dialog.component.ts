import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Dialog {
  // TODO add transfers
  action: 'withdraw' | 'deposit' | 'create' | 'delete';
  title: string;
  hideInput?: boolean;

}

@Component({
  selector: 'radancytestapp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent<T> {
  outputValue!: T;
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog,
  ) {

  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm() {
    // TODO implement API call based on action
    this.dialogRef.close(this.outputValue);
  }
}
