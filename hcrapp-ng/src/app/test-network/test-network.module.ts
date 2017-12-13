import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TestNetworkRoutingModule } from './test-network-routing.module';
import { TestNetworkComponent } from './test-network.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TestNetworkRoutingModule
  ],
  declarations: [TestNetworkComponent]
})
export class TestNetworkModule { }
