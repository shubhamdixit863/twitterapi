import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentsearchesComponent } from './recentsearches.component';

describe('RecentsearchesComponent', () => {
  let component: RecentsearchesComponent;
  let fixture: ComponentFixture<RecentsearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentsearchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentsearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
