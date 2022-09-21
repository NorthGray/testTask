import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryPageComponent } from './summary-page/summary-page.component';
import { NavigatorComponent } from './navigator/navigator.component';

const routes: Routes = [
  { path: '', component: SummaryPageComponent },
  { path: 'navigator', component: NavigatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
