import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { pathMatch: 'full', path: "", component: AppComponent },
  { path: 'train', loadChildren: './train-network/train-network.module#TrainNetworkModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }