import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSachComponent } from './add-sach.component';

describe('AddSachComponent', () => {
  let component: AddSachComponent;
  let fixture: ComponentFixture<AddSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
