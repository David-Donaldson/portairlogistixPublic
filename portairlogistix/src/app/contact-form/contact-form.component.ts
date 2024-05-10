import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { HttpService } from '../services/http.service';
import Swal from 'sweetalert2'
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  infowindow: any = new google.maps.InfoWindow;
  contactForm: FormGroup;
  submitted: boolean = false;
  contactFormObservable: Object;
  emailObservable: Object;
  arrayShift: any;
  public type: 'image' | 'audio';
  public captchaResponse?: string;

  constructor(private _http: HttpService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private recaptchaV3Service: ReCaptchaV3Service) {
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      ContactName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.required, Validators.email]],
      EmailMessage: ['', [Validators.required]]
    });
  }

  get f() { return this.contactForm.controls }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.recaptchaV3Service.execute("importantAction").subscribe( (captchatoken:string) => {
      this.contactFormObservable = this._http.submitContactform(this.contactForm.value, captchatoken).subscribe({
        next: (result) => {
          this.submitted = false;
          this.contactForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Details Submitted!'
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error Submitting Details'
          })
        }
      });
    });
  }

}
