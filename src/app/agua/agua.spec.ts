import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Agua } from './agua';

describe('Agua', () => {
  let component: Agua;
  let fixture: ComponentFixture<Agua>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agua],
    }).compileComponents();

    fixture = TestBed.createComponent(Agua);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
