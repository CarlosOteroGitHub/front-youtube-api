import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiFavoritosComponent } from './api-favoritos.component';

describe('ApiFavoritosComponent', () => {
  let component: ApiFavoritosComponent;
  let fixture: ComponentFixture<ApiFavoritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiFavoritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
