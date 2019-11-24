const LEFT_BRACE = Symbol("{");
const RIGHT_BRACE = Symbol("}");
const LEFT_BRACKET = Symbol("[");
const RIGHT_BRACKET = Symbol("]");
const COMMA = Symbol(",");
const STRING = Symbol("string");
const TRUE = Symbol("true");
const FALSE = Symbol("false");
const NULL = Symbol("null");
const COLON = Symbol(":");
const QUOTES = Symbol('"');
const NUMBER = Symbol("number");

const _tok = (type, val) => ({ type, val });

const INTEGER_EXP = /^-?\d+(\.\d+)?([e|E]-?\d+)?/;
const toNum = exp => {
  let cur = 0;
  function unexpected() {
    throw new Error(`unexpected ${exp}: ${cur}`);
  }
  if (exp.length <= 0) unexpected();

  const sign = 1;
  if (exp[cur] === "-") {
    cur++;
    sign = -1;
  }
  let d = 0;
  let f = 0;
  let e = 0;

  let ff = 0.1;

  let inFraction = false;
  let inExponent = false;

  let exponentSign = 1;

  while (cur < exp.length) {
    const ch = exp[cur];
    if (!inFraction && !inExponent && ch === ".") {
      inFraction = true;
    } else if (!inExponent && ch === "e" || ch === "E") {
      inFraction = false;
      inExponent = true;
    } else if (
      ch.charCodeAt(0) >= "0".charCodeAt(0) &&
      ch.charCodeAt(0) <= "9".charCodeAt(0)
    ) {
      const n = ch.charCodeAt(0) - "0".charCodeAt(0);
      if (inFraction) {
        f += ff * n;
        ff *= 0.1;
      } else if (inExponent) {
        e = e * 10 + n;
      } else {
        d = d * 10 + n;
      }
    } else if (inExponent && ch === "-") {
      exponentSign = -1;
    } else {
      unexpected();
    }
    cur++;
  }
  return sign * (d + f) * Math.pow(10, e * exponentSign);
};

class Lexer {
  constructor(str) {
    this.str = str;
  }

  lex() {
    this.cur = 0;
    const toks = [];
    let isInStr = false;
    let strBuf = "";
    let escape = false;
    while (this.peek()) {
      const ch = this.peek();
      if (isInStr) {
        this.eat();
        if (ch === '"' && !escape) {
          toks.push(_tok(STRING, strBuf));
          isInStr = false;
          strBuf = "";
        } else {
          if (!escape && ch === "\\") escape = true;
          else if (escape) escape = false;
          strBuf += ch;
        }
      } else {
        if (this.eatIf("{")) toks.push(_tok(LEFT_BRACE, "{"));
        else if (this.eatIf("}")) toks.push(_tok(RIGHT_BRACE, "}"));
        else if (this.eatIf("[")) toks.push(_tok(LEFT_BRACKET, "["));
        else if (this.eatIf("]")) toks.push(_tok(RIGHT_BRACKET, "]"));
        else if (this.eatIf(",")) toks.push(_tok(COMMA, ","));
        else if (this.eatIf(":")) toks.push(_tok(COLON, ":"));
        else if (this.eatIf('"')) isInStr = true;
        else if (this.eatIf("true")) {
          toks.push(_tok(TRUE, true));
        } else if (this.eatIf("false")) {
          toks.push(_tok(FALSE, false));
        } else if (this.eatIf("null")) {
          toks.push(_tok(NULL, null));
        } else if (this.peekIf(INTEGER_EXP)) {
          toks.push(_tok(NUMBER, toNum(this.eatIf(INTEGER_EXP))));
        } else if (this.eatIf(/^\s+/)) {
        } else {
          this.unexpected();
        }
      }
    }
    return toks;
  }

  eatIf(exp) {
    const e = this.peekIf(exp);
    if (e) {
      this.cur += e.length;
      return e;
    }
  }

  peekIf(exp) {
    if (exp instanceof RegExp) {
      const match = exp.exec(this.str.substring(this.cur));
      if (match) {
        return match[0];
      }
    } else if (this.str.substring(this.cur, this.cur + exp.length) === exp) {
      return exp;
    }
  }

  peek() {
    return this.str[this.cur];
  }

  eat() {
    this.guard();
    return this.str[this.cur++];
  }

  guard() {
    if (this.cur >= this.str.length) {
      this.unexpected();
    }
  }
  unexpected() {
    throw new Error(`unexpcted ${this.cur}`);
  }
}

class Parser {
  constructor(toks) {
    this.toks = toks;
  }

  peek() {
    return this.toks[this.cur];
  }

  eat() {
    this.guard();
    return this.toks[this.cur++];
  }

  eatIf(type) {
    this.guard();
    if (this.toks[this.cur].type === type) return this.eat();
    else this.unexpected();
  }

  guard() {
    if (this.cur >= this.toks.length) this.unexpected();
  }

  unexpected() {
    throw new Error(`unexpected ${this.cur}`);
  }

  parse() {
    this.cur = 0;
    return this.pvalue();
  }

  pvalue() {
    const type = this.peek().type;
    if (
      type === STRING ||
      type === FALSE ||
      type === TRUE ||
      type === NULL ||
      type === NUMBER
    )
      return this.eat().val;
    else if (type === LEFT_BRACE) {
      return this.pobj();
    } else if (type === LEFT_BRACKET) {
      return this.parr();
    }
    this.unexpected();
  }

  parr() {
    const arr = [];
    this.eatIf(LEFT_BRACKET);
    while (this.peek() != RIGHT_BRACKET) {
      arr.push(this.pvalue());
      if (this.peek().type === COMMA) this.eat();
      else break;
    }
    this.eatIf(RIGHT_BRACKET);
    return arr;
  }

  pobj() {
    const obj = {};
    this.eatIf(LEFT_BRACE);
    while (this.peek() !== RIGHT_BRACE) {
      const key = this.eatIf(STRING);
      this.eatIf(COLON);
      const val = this.pvalue();
      obj[key.val] = val;
      if (this.peek().type === COMMA) this.eat();
      else break;
    }
    this.eatIf(RIGHT_BRACE);
    return obj;
  }
}


module.exports = {
  Lexer,
  Parser
}
