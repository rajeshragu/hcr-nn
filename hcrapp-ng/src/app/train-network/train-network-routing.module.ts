import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainNetworkComponent } from './train-network.component';

const routes: Routes = [
  { path: '', component: TrainNetworkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainNetworkRoutingModule { }
