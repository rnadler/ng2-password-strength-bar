
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
        const div = de.nativeElement;
        expect(div.innerText).toMatch(/Password strength:/);
    });

    it('should correctly set custom bar colors', () => {
      comp.account.password = 'testinput';
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(221, 44, 0)'); // #DD2C00
    });

    it('should correctly use default bar colors', () => {
      comp.account.password = 'testinputN';
      comp.myColors = null;
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 153, 0)'); // #F90 == #FF9900

      comp.account.password = 'testinput';
      comp.myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00']; // only 4 items
      fixture.detectChanges();
      expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 0, 0)'); // #F00 == #FF0000
    });
});
