import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrainNetworkRoutingModule } from './train-network-routing.module';
import { TrainNetworkComponent } from './train-network.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainNetworkRoutingModule
  ],
  declarations: [TrainNetworkComponent]
})
export class TrainNetworkModule { }
