
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app';
import { PasswordStrengthBarModule } from '../index'

describe('App', function () {
    let de: DebugElement;
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let bar0: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ BrowserModule, FormsModule, PasswordStrengthBarModule ],
            declarations: [ AppComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('div'));
        bar0 = fixture.debugElement.query(By.css('#bar0'));
    });

    it('Should create App', () => expect(comp).toBeDefined() );

    it('App should have expected text', () => {
        fixture.detectChanges();
        expect(de.nativeElement.innerText).toMatch(/Password strength:/);
        comp.barLabel = 'Seguridad de la contraseña:';
        fixture.detectChanges();
        expect(de.nativeElement.innerText).toMatch(/Seguridad de la contraseña:/);
    });

    it('should correctly set custom bar colors', () => {
      comp.account.password = 'testinput';
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 109, 0)');
      expect(de.nativeElement.innerText).toMatch(/\(Weak\)/);
    });

    it('should correctly use default bar colors', () => {
      comp.account.password = 'testinputN';
      comp.myColors = null;
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 255, 0)');
      expect(de.nativeElement.innerText).toMatch(/\(Normal\)/);

      comp.account.password = 'testinput';
      comp.myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00']; // only 4 items
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 153, 0)');
      expect(de.nativeElement.innerText).toMatch(/\(Weak\)/);
    });

    it('should correctly show custom base color', () => {
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 255, 255)'); // #FFF
      expect(de.nativeElement.innerText).toMatch(/\(Useless\)/);
    });

    it('should correctly show default base color and strength label (none)', () => {
      comp.baseColor = null;
      comp.strengthLabels = null;
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(221, 221, 221)'); // #DDD
      expect(de.nativeElement.innerText).not.toMatch(/\(Useless\)/);
    });
    it('should correctly show default base color on a bad base color', () => {
      comp.baseColor = 'EEE'; // invalid color
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(221, 221, 221)'); // #DDD
    });

    it('should have the correct strength index on password change', () => {
      comp.account.password = 'testinput-123';
      fixture.detectChanges();
      expect(comp.strength).toEqual(3);

      comp.account.password = 'Testinput-123';
      fixture.detectChanges();
      expect(comp.strength).toEqual(4);

      comp.strength = 1;
      comp.account.password = '';  // Event should be emitted even on an empty string
      fixture.detectChanges();
      expect(comp.strength).toEqual(0);
    });
});
