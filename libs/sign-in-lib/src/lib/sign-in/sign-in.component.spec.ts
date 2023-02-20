import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a hidePassword value of true', () => {
    expect(component.hidePassword).toBeTruthy();
    expect(component.hidePassword).toBe(true);
  });

  it('should get an error message', () => {
    expect(component.getErrorMessage()).toBe('You must enter a value');
  });

  it('should sign in', () => {
    spyOn(component.signedIn, 'emit');
    component.signIn();
    expect(component.signedIn.emit).toHaveBeenCalled();
  });
});
