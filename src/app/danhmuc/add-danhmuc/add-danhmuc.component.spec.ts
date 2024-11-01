import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDanhmucComponent } from './add-danhmuc.component';

describe('AddDanhmucComponent', () => {
  let component: AddDanhmucComponent;
  let fixture: ComponentFixture<AddDanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDanhmucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
