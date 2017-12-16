import {Component, NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PasswordStrengthBarModule} from '../index';

@Component({
  selector: 'my-app',
  template: `
    <h3>Angular 2 Password Strength Bar</h3>
    <div>
      <form name="myForm" novalidate>
        <input type="password" class="form-control" id="password" name="password" placeholder="Enter password"
               [(ngModel)]="account.password" #password="ngModel"
               minlength="5" maxlength="50" required>
        <ng2-password-strength-bar [passwordToCheck]="account.password"
                                   [barLabel]="barLabel"></ng2-password-strength-bar>
      </form>
    </div>
  `,
})
export class AppComponent {
  public account = {
    password: <string>null
  };
  public barLabel: string = "Password strength:";
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PasswordStrengthBarModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
