
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
    });

    it('Should create App', () => expect(comp).toBeDefined() );

    it('App should have expected text', () => {
        fixture.detectChanges();
        const div = de.nativeElement;
        expect(div.innerText).toMatch(/Password strength:/);
    });
});