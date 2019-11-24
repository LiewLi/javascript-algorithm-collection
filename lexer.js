class Lexer {
  constructor(rules) {
    for (const rule of rules) {
      if (rule[1].source[0] !== "^" || !rule[1].global) {
        throw new Error("INVALID REGEXP");
      }
      this.rules = rules;
    }
  }

  parse(input) {
    return this.parseNextAvailable(input, 0, 1, 1);
  }

  parseNextAvailable(input, index, rowBegin, colBegin) {
    let token;
    while (true) {
      token = this.parseNext(
        input,
        token ? token.pos.index + token.text.length : index,
        token ? token.pos.rowEnd : rowBegin,
        token ? token.pos.colEnd : colBegin
      );
      if (!token) return;
      else if (token.keep) return token;
    }
  }

  parseNext(input, indexStart, rowBegin, colBegin) {
    if (indexStart === input.length) {
      return;
    }
    let result;
    const substr = input.substring(indexStart);
    for (const [keep, regexp, kind] of this.rules) {
      regexp.lastIndex = 0;
      if (regexp.test(substr)) {
        const text = substr.substring(0, regexp.lastIndex);
        let rowEnd = rowBegin;
        let colEnd = colBegin;
        for (const ch of text) {
          switch (ch) {
            case "\r":
              break;
            case "\n":
              rowEnd++;
              colEnd = 1;
              break;
            default:
              colEnd++;
          }
        }

        const newResult = new Token(
          this,
          input,
          kind,
          text,
          {
            index: indexStart,
            rowBegin,
            colBegin,
            rowEnd,
            colEnd
          },
          keep
        );

        if (
          result === undefined ||
          result.text.length < newResult.text.length
        ) {
          result = newResult;
        }
      }
    }

    if (result === undefined) {
      throw new TokenError(
        {
          index: indexStart,
          rowBegin,
          rowEnd: rowBegin,
          colBegin,
          colEnd: colBegin
        },
        `Unable to tokenize the rest of input: ${input.substring(indexStart)}`
      );
    } else {
      return result;
    }
  }
}

class Token {
  constructor(lexer, input, kind, text, pos, keep) {
    this.lexer = lexer;
    this.input = input;
    this.kind = kind;
    this.text = text;
    this.pos = pos;
    this.keep = keep;
  }

  get next() {
    if (this.nexToken === undefined) {
      this.nexToken = this.lexer.parseNextAvailable(
        this.input,
        this.pos.index + this.text.length,
        this.pos.rowEnd,
        this.pos.colEnd
      );
    }
    return this.nexToken === null ? undefined : this.nexToken;
  }
}

class TokenError extends Error {
  constructor(pos, errMsg) {
    super(errMsg);
    this.pos = pos;
  }
}
