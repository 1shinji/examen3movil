import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebasSqlitePage } from './pruebas-sqlite.page';

describe('PruebasSqlitePage', () => {
  let component: PruebasSqlitePage;
  let fixture: ComponentFixture<PruebasSqlitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasSqlitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
