import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDanhmucComponent } from './list-danhmuc.component';

describe('ListDanhmucComponent', () => {
  let component: ListDanhmucComponent;
  let fixture: ComponentFixture<ListDanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDanhmucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
