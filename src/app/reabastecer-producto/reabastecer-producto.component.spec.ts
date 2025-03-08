import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReabastecerProductoComponent } from './reabastecer-producto.component';

describe('ReabastecerProductoComponent', () => {
  let component: ReabastecerProductoComponent;
  let fixture: ComponentFixture<ReabastecerProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReabastecerProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReabastecerProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
