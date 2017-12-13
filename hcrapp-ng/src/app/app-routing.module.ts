import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { pathMatch: 'full', path: "", component: AppComponent },
  { path: 'train', loadChildren: './train-network/train-network.module#TrainNetworkModule' },
  { path: 'test', loadChildren: './test-network/test-network.module#TestNetworkModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }