import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './product.service';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CustomerService } from './customer.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    ContextMenuModule,
    HttpClientModule,
    ToastModule,
    FormsModule,
    DialogModule,
    MultiSelectModule,
    SliderModule,
    RatingModule,
    CalendarModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    ButtonModule,
    EditorModule,
    BsDropdownModule.forRoot(),
    CarouselModule,
    ChartModule
  ],
  providers: [
    ProductService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
