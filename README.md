# password-strength-bar

[![Build Status](https://travis-ci.org/rnadler/password-strength-bar.svg?branch=master)](https://travis-ci.org/rnadler/password-strength-bar)

This an Angular 2 implementation of [AngularJS Directive to test the strength of a password](https://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password/) by **Bruno Scopelliti**. See [Angular 2 Password Strength Bar](http://rdn-consulting.com/blog/2016/09/28/angular-2-password-strength-bar/) for details of the changes.

[Try it live!](https://plnkr.co/edit/z0x5gG?p=preview)

## Install in your project

`npm install --save password-strength-bar`

## Using the Component
### Add Component to HTML 
```
<password-strength-bar 
    [passwordToCheck]="account.password" 
    [barLabel]="barLabel">
</password-strength-bar>
```
### Input Parameters 

```
export class App {
    public account = {
        password: <string>null
    };
    public barLabel: string = "Password strength:";
    // ...
}
```
#### passwordToCheck (type: string)

- The variable containing the password to check.

#### barLabel (type: string)

- The variable containing the label displayed to the left of the bar. 
## Run the example application locally
- `git clone https://github.com/rnadler/password-strength-bar.git`
- `cd password-strength-bar`
- `npm install`
- `npm start` # Browser should open automatically

## Run the tests locally
- Same as above, except for the last step do:
- `npm run test-once`


