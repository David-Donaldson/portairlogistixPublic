import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgParticlesModule } from "ng-particles";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RatesComponent } from './rates/rates.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './google-map/google-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, HeaderComponent, FooterComponent, RatesComponent, ContactComponent, ContactFormComponent, GoogleMapComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, NgbModule, HttpClientModule, NgxSpinnerModule, NgParticlesModule, FormsModule, ReactiveFormsModule, RecaptchaV3Module, GoogleMapsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
