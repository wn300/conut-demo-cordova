import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BasculaUnoComponent } from './bascula-uno/bascula-uno.component';
import { BasculaDosComponent } from './bascula-dos/bascula-dos.component';


@NgModule({
  declarations: [
    AppComponent,
    BasculaUnoComponent,
    BasculaDosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
