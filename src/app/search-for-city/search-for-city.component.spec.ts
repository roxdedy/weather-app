import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForCityComponent } from './search-for-city.component';

describe('SearchForCityComponent', () => {
  let component: SearchForCityComponent;
  let fixture: ComponentFixture<SearchForCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
