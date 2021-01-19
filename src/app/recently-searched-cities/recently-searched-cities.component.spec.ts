import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlySearchedCitiesComponent } from './recently-searched-cities.component';

describe('RecentlySearchedCitiesComponent', () => {
  let component: RecentlySearchedCitiesComponent;
  let fixture: ComponentFixture<RecentlySearchedCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlySearchedCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlySearchedCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
