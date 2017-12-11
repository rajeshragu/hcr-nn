import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainNetworkComponent } from './train-network.component';

describe('TrainNetworkComponent', () => {
  let component: TrainNetworkComponent;
  let fixture: ComponentFixture<TrainNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
