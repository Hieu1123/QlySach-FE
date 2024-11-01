import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSachComponent } from './edit-sach.component';

describe('EditSachComponent', () => {
  let component: EditSachComponent;
  let fixture: ComponentFixture<EditSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
