import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiografiaDetalladaPage } from './biografia-detallada.page';

describe('BiografiaDetalladaPage', () => {
  let component: BiografiaDetalladaPage;
  let fixture: ComponentFixture<BiografiaDetalladaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiografiaDetalladaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
