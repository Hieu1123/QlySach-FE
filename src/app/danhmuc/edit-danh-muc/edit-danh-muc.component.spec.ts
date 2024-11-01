import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDanhMucComponent } from './edit-danh-muc.component';

describe('EditDanhMucComponent', () => {
  let component: EditDanhMucComponent;
  let fixture: ComponentFixture<EditDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDanhMucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
