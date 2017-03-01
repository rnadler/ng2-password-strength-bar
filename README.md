# ng2-password-strength-bar

[![Build Status](https://travis-ci.org/rnadler/ng2-password-strength-bar.svg?branch=master)](https://travis-ci.org/rnadler/ng2-password-strength-bar)
[![npm version](https://badge.fury.io/js/ng2-password-strength-bar.svg)](https://badge.fury.io/js/ng2-password-strength-bar)

This an Angular 2 implementation of [AngularJS Directive to test the strength of a password](https://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password/). 
- See [Angular 2 Password Strength Bar](http://rdn-consulting.com/blog/2016/09/28/angular-2-password-strength-bar/) for details of the changes since the Angular 1 original.
- See [Publishing an Angular 2 Component NPM Package](http://rdn-consulting.com/blog/2016/12/09/publishing-an-angular-2-component-npm-package/) for some explanation of this project.

[Try it live!](https://plnkr.co/edit/z0x5gG?p=preview)

## Install in your project

`npm install ng2-password-strength-bar --save`

#### 1.1.x Version Update Note

If you upgrade from v1.0.x to v1.1.x you will need to change the **PasswordStrengthBar** import. There are two options:
 1. Change to **PasswordStrengthBarModule** and add this to the **imports** section of the @NgModule metadata instead of the declarations (shown below), or
 2. Change to **PasswordStrengthBarComponent** and update the name in the **declarations** section to match.

## Using the Component
### Add Component to Module imports
```
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
...
@NgModule({
 ...
   declarations: [
        AppComponent,
        ...
    ],
    imports: [
      BrowserModule,
      FormsModule,
      PasswordStrengthBarModule,
      ...
 ...
})
export class AppModule {}
```
### Add Component to your Application
```
@Component({
    selector: 'my-app',
    template: `
  <h3>Angular 2 Password Strength Bar</h3>
    <div>
       <form name="myForm" novalidate>
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter password"
                 [(ngModel)]="account.password" #password="ngModel"
                 minlength="5" maxlength="50" required>
            <ng2-password-strength-bar
                [passwordToCheck]="account.password"
                [barLabel]="barLabel">
            </ng2-password-strength-bar>
        </form>
    </div>
  `,
})
export class App {
    public account = {
        password: <string>null
    };
    public barLabel: string = "Password strength:";
    // ...
}
```
### Input Parameters

\<ng2-password-strength-bar \[**passwordToCheck**\]="account.password"  \[**barLabel**\]="barLabel"\> \</ng2-password-strength-bar\>

#### passwordToCheck (type: string)

- The variable containing the password to check.

#### barLabel (type: string)

- The variable containing the label displayed to the left of the bar.

## Run the example application locally
- `git clone https://github.com/rnadler/ng2-password-strength-bar.git`
- `cd ng2-password-strength-bar`
- `npm install`
- `npm start` # Browser should open automatically on http://localhost:3000

## Run the tests locally
- Same as above, except for the last step do:
- `npm run test-once`  # Defaults to a Firefox browser

### License

[MIT](https://tldrlegal.com/license/mit-license)
