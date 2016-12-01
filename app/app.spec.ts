
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule}           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { App } from './app';
import { PasswordStrengthBar } from './passwordStrengthBar'

describe('App', function () {
    let de: DebugElement;
    let comp: App;
    let fixture: ComponentFixture<App>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ BrowserModule, FormsModule ],
            declarations: [ App, PasswordStrengthBar ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(App);
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