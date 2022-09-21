import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, NavigatorComponent, SummaryPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
