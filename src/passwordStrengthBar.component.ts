import {Component, OnChanges, Input, SimpleChange} from '@angular/core';

@Component({
  selector: 'ng2-password-strength-bar',
  styles: [`
    .strengthBar {
      display: inline;
      list-style: none;
      margin: 0 0 0 15px;
      padding: 0;
      vertical-align: 2px;
    }

    .strengthBar .point {
      background: #DDD;
      border-radius: 2px;
      display: inline-block;
      height: 5px;
      margin-right: 1px;
      width: 20px;
    }

    .strengthBar .point:last-child {
      margin: 0;
    }
    .pre {
      white-space: pre;
    }
  `],
  template: `
    <div id="strength" #strength>
      <small>{{barLabel}}</small>
      <ul id="strengthBar" class="strengthBar">
        <li id="bar0" class="point" [style.background-color]="bar0"></li>
        <li class="point" [style.background-color]="bar1"></li>
        <li class="point" [style.background-color]="bar2"></li>
        <li class="point" [style.background-color]="bar3"></li>
        <li class="point" [style.background-color]="bar4"></li>
      </ul>
      <small [hidden]="!strengths" class="pre">  ({{strengthLabel}})</small>
    </div>
  `
})
export class PasswordStrengthBarComponent implements OnChanges {
  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  @Input() barColors: Array<string>;
  @Input() baseColor: string;
  @Input() strengthLabels: Array<string>;

  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  private strengthLabel: string;

  private colors: Array<string>;
  private strengths: Array<string>;
  private defaultColors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
  private defaultBaseColor: string = '#DDD';

  constructor() {
    this.colors = this.defaultColors;
  }

  private checkBarColors(): void {
    // Accept custom colors if input is valid, otherwise the default colors will be used
    if (this.barColors && this.barColors.length === 5) {
      this.colors = this.barColors.slice();
    } else {
      this.colors = this.defaultColors;
    }

    this.strengths = this.strengthLabels && this.strengthLabels.length === 5 ? this.strengthLabels.slice() : null;
    this.setStrengthLabel(0);

    if(!this.baseColor) {
      this.baseColor = this.defaultBaseColor;
    }
  }

  private static measureStrength(p: string) {
    let _force = 0;
    const _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

    const _lowerLetters = /[a-z]+/.test(p);
    const _upperLetters = /[A-Z]+/.test(p);
    const _numbers = /[0-9]+/.test(p);
    const _symbols = _regex.test(p);

    const _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

    let _passedMatches = 0;
    for (let _flag of _flags) {
      _passedMatches += _flag === true ? 1 : 0;
    }

    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    _force += _passedMatches * 10;

    // penality (short password)
    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

    // penality (poor variety of characters)
    _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
    _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
    _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

    return _force;

  }

  private getColor(s: number) {
    let idx = 0;
    if (s <= 10) {
      idx = 0;
    }
    else if (s <= 20) {
      idx = 1;
    }
    else if (s <= 30) {
      idx = 2;
    }
    else if (s <= 40) {
      idx = 3;
    }
    else {
      idx = 4;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }

  getStrengthIndexAndColor(password: string) {
    return this.getColor(PasswordStrengthBarComponent.measureStrength(password));
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    let password = changes['passwordToCheck'].currentValue;
    this.checkBarColors();
    this.setBarColors(5, this.baseColor);
    if (password) {
      let c = this.getStrengthIndexAndColor(password);
      this.setStrengthLabel(c.idx - 1);
      this.setBarColors(c.idx, c.col);
    }
  }

  private setBarColors(count: number, col: string) {
    for (let _n = 0; _n < count; _n++) {
      this['bar' + _n] = col;
    }
  }
  private setStrengthLabel(index: number) {
    if (this.strengths) {
      this.strengthLabel = this.strengths[index];
    }
  }
}
