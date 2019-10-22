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
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  public isMobile: boolean = this.api.isMobileWatcher;
  public isMedium: boolean = this.api.isMediumWatcher;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>,
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
