import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestNetworkComponent } from './test-network.component';

const routes: Routes = [
  { path:'', component: TestNetworkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestNetworkRoutingModule { }
