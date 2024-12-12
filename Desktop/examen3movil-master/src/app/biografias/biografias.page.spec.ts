import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiografiasPage } from './biografias.page';

describe('BiografiasPage', () => {
  let component: BiografiasPage;
  let fixture: ComponentFixture<BiografiasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiografiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
