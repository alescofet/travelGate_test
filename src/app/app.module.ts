import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HotelComponent } from './homepage/ui/hotel/hotel.component';
import { PlainJsonComponent } from './homepage/ui/plain-json/plain-json.component';
import { PartTwoComponent } from './homepage/ui/part-two/part-two.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HotelComponent,
    PlainJsonComponent,
    PartTwoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
