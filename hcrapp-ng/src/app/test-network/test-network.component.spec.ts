import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNetworkComponent } from './test-network.component';

describe('TestNetworkComponent', () => {
  let component: TestNetworkComponent;
  let fixture: ComponentFixture<TestNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
