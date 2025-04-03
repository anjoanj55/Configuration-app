import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './confirm-snackbar.component.html',
  styleUrl: './confirm-snackbar.component.css'
})
export class ConfirmSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ConfirmSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.snackBarRef.dismissWithAction(); // Triggers onAction() in the parent
  }

  onCancel(): void {
    this.snackBarRef.dismiss(); // Simply dismisses without action
  }
}
