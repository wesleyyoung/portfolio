import {
  Component,
  OnInit,
  Inject,
  HostListener,
  NgZone,
  ViewChild
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatIconRegistry
} from '@angular/material';
import {
  FormControl,
  Validators
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import {
  ApiService,
  ContactForm
} from '../api.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  public isMobile: boolean = this.api.isMobileWatcher;
  public isMedium: boolean = this.api.isMediumWatcher;

  public thisForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
    sent: new Date()
  };

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>,
    private dialog: MatDialog,
    private ngZone: NgZone,
    private api: ApiService
  ) { }

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public requiredFormControl = new FormControl('', [
    Validators.required
  ]);

  public phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)
  ]);

  contactMe(): void {
    
    if (this.thisForm.name != '' &&
      this.thisForm.email != '' &&
      this.thisForm.phone != '') {

      this.api.contactMe(
        this.thisForm,
        data => {
          let dialogRef = this.dialog.open(SuccessModal, {
            panelClass: [
              'dark-bg'
            ]
          });
          dialogRef.afterClosed().subscribe(res => {
            this.onNoClick();
          });
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }

  triggerResize() {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    this.api.isMobile.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.api.isMedium.subscribe(isMed => {
      this.isMedium = isMed;
    });
  }

}

@Component({
  selector: 'app-contact-success-modal',
  template: `
<div mat-dialog-content style="text-align: center; overflow: visible;">
  <mat-icon color="accent" style="font-size: 100px; width: 100%; height: 100px;">check_circle</mat-icon>
  <h1 style="font-family: SrcSansProLight; margin: 0 !important;">Success</h1>
  <mat-dialog-actions align="center">
    <button mat-button color="accent" (click)="onNoClick()">OK</button>
  </mat-dialog-actions>
</div>
  `,
  styleUrls: ['./contact-modal.component.css']
})
export class SuccessModal {
  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
