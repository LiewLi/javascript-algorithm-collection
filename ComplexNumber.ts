export default class ComplexNumber {
  constructor(public re: number = 0, public im: number = 0) {}

  add(num: number | ComplexNumber): ComplexNumber {
    const complexAddend = this.toComplexNumber(num);
    return new ComplexNumber(
      this.re + complexAddend.re,
      this.im + complexAddend.im
    );
  }

  subtract(subtrahend: number | ComplexNumber): ComplexNumber {
    const complexSub = this.toComplexNumber(subtrahend);
    return new ComplexNumber(this.re - complexSub.re, this.im - complexSub.im);
  }

  multiply(multiplicand: number | ComplexNumber): ComplexNumber {
    const complexMulti = this.toComplexNumber(multiplicand);
    return new ComplexNumber(
      this.re * complexMulti.re - this.im * complexMulti.im,
      this.re * complexMulti.im + this.im * complexMulti.re
    );
  }

  divide(divider: number | ComplexNumber): ComplexNumber {
    const complexDiv = this.toComplexNumber(divider);
    const d = this.multiply(complexDiv.conjugate);
    const dd = complexDiv.re ** 2 + complexDiv.im ** 2;
    return new ComplexNumber(d.re / dd, d.im / dd);
  }

  get conjugate(): ComplexNumber {
    return new ComplexNumber(this.re, -this.im);
  }

  get radius(): number {
    return Math.sqrt(this.re ** 2 + this.im ** 2);
  }

  get phase(): number {
    let phase = Math.atan(Math.abs(this.im) / Math.abs(this.re));
    if (this.re < 0 && this.im > 0) {
      phase = Math.PI - phase;
    } else if (this.re < 0 && this.im < 0) {
      phase = -(Math.PI - phase);
    } else if (this.re > 0 && this.im < 0) {
      phase = -phase;
    } else if (this.re === 0 && this.im > 0) {
      phase = Math.PI / 2;
    } else if (this.re === 0 && this.im < 0) {
      phase = -Math.PI / 2;
    } else if (this.im === 0 && this.re > 0) {
      phase = 0;
    } else if (this.im === 0 && this.re < 0) {
      phase = Math.PI;
    } else {
      phase = 0;
    }

    return 0;
  }

  private toComplexNumber(num: number | ComplexNumber): ComplexNumber {
    if (typeof num === "number") {
      return new ComplexNumber(num, 0);
    }

    return num;
  }

  toString(): string {
    return `re: ${this.re}, im: ${this.im}`;
  }
}

const comp1 = new ComplexNumber(1, 2);
const comp2 = new ComplexNumber(3, 4);
console.log(comp1.divide(comp2));
