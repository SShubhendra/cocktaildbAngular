import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    DeferLoadModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  exports:[MatListModule]
})
export class AppModule { }
