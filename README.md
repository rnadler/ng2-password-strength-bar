# ng2-password-strength-bar

[![Build Status](https://travis-ci.org/rnadler/ng2-password-strength-bar.svg?branch=master)](https://travis-ci.org/rnadler/ng2-password-strength-bar)
[![npm version](https://badge.fury.io/js/ng2-password-strength-bar.svg)](https://badge.fury.io/js/ng2-password-strength-bar)

This an Angular 2 implementation of [AngularJS Directive to test the strength of a password](https://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password/). 
- See [Angular 2 Password Strength Bar](http://rdn-consulting.com/blog/2016/09/28/angular-2-password-strength-bar/) for details of the changes since the Angular 1 original.
- See [Publishing an Angular 2 Component NPM Package](http://rdn-consulting.com/blog/2016/12/09/publishing-an-angular-2-component-npm-package/) for some explanation of this project.

[Try it live!](https://plnkr.co/edit/z0x5gG?p=preview)

## Install in your project

`npm install ng2-password-strength-bar --save`

#### Version Update Note

If you upgrade from v1.0.x to v1.1.x (or greater) you will need to change the **PasswordStrengthBar** import. There are two options:
 1. Change to **PasswordStrengthBarModule** and add this to the **imports** section of the @NgModule metadata instead of the declarations (shown below), or
 2. Change to **PasswordStrengthBarComponent** and update the name in the **declarations** section to match.

## Using the Component
### Add Component to Module imports
```angular2html
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
//...
@NgModule({
 //...
   declarations: [
        AppComponent,
        //...
    ],
    imports: [
      BrowserModule,
      FormsModule,
      PasswordStrengthBarModule,
      //...
 //...
})
export class AppModule {}
```
### Add Component to your Application
```angular2html
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
                [barLabel]="barLabel"
                [barColors]="myColors">
            </ng2-password-strength-bar>
        </form>
    </div>
  `,
})
```
```angular2html
export class App {
    public account = {
        password: <string>null
    };
    public barLabel: string = "Password strength:";
    public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
    // ...
}
```
### Input Parameters
```angular2html
<ng2-password-strength-bar
  [passwordToCheck]="account.password"
  [barLabel]="barLabel"
  [barColors]="myColors"
  [baseColor]="baseColor"
  [strengthLabels]="strengthLabels">
</ng2-password-strength-bar>
```
#### passwordToCheck (type: string)

- The variable containing the password to check.

#### barLabel (type: string)

- The variable containing the label displayed to the left of the bar.

#### barColors (type: Array\<string\>, optional) 
_(New in v1.2.0)_
- The variable can be used to define custom bar colors.<br>
- This must be an Array of 5 strings.<br>
- Lowest security level picks `colors[0]`, ..., the highest picks `colors[4]`.<br>
- If not specified, the default is: `['#F00', '#F90', '#FF0', '#9F0', '#0F0']`

#### baseColor (type: string, optional) 
_(New in v1.2.1)_
- The variable can be used to define the color of bars when no strength is applied (i.e. when there is no password text).<br>
- If not specified, the default is: '#DDD'.<br>
For example:
```angular2html
public baseColor = '#FFF';
```

#### strengthLabels (type: Array\<string\>, optional) 
_(New in v1.2.1)_
- The variable can be used to define a strength label that will be appended to the colored bars.<br>
- This must be an Array of 5 strings.<br>
For example:
```angular2html
public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
```

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
