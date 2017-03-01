import { PasswordStrengthBarComponent } from '../index'

let psb: PasswordStrengthBarComponent;

function testPassword(password: string, index: number, color: string) {
    let c = psb.getStrengthIndexAndColor(password);
    expect(c.idx).toBe(index);
    expect(c.col).toBe(color);
}

describe('PasswordStrengthBarComponent', () => {

    beforeEach(() => {
        psb = new PasswordStrengthBarComponent();
    });

    it('Should expect weak bar', () => {
        testPassword("xxx", 1, '#F00');
    });
    it('Should expect strong bar', () => {
        testPassword("\\E>431f>0r2)0gk", 5, '#0F0');   // From https://strongpasswordgenerator.com/
    });
});
