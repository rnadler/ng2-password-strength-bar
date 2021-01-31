import {Component, OnChanges, Input, SimpleChange, Output, EventEmitter} from '@angular/core';

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
      <small [hidden]="!strengths" class="pre">  {{strengthLabel}}</small>
    </div>
  `
})
export class PasswordStrengthBarComponent implements OnChanges {
  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  @Input() barColors: Array<string>;
  @Input() baseColor: string;
  @Input() strengthLabels: Array<string>;
  @Output() onStrengthChanged: EventEmitter<number> = new EventEmitter<number>();

  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  strengthLabel: string;

  private colors: Array<string>;
  strengths: Array<string>;
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

    if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.baseColor)) {
      this.baseColor = this.defaultBaseColor;
    }
  }

  private static measureStrength(pass: string) {
    let score = 0;
    // award every unique letter until 5 repetitions
    let letters = {};
    for (let i = 0; i< pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
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
    if (!changes['passwordToCheck']) {
      return;
    }
    const password = changes['passwordToCheck'].currentValue;
    this.checkBarColors();
    this.setBarColors(5, this.baseColor);
    let strength = 0;
    if (password) {
      const c = this.getStrengthIndexAndColor(password);
      strength = c.idx - 1;
      this.setStrengthLabel(strength);
      this.setBarColors(c.idx, c.col);
    }
    this.onStrengthChanged.emit(strength);
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
