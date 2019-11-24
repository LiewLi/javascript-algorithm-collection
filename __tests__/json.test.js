const {Lexer, Parser} = require('../json')

test('simple json parse', () => {
  const data = {
    ab: "hello world",
    cd: [{ foo: 123 }, { bar: 'goo\\\\gle' }],
    ef: 123.45e-13
  };

  const exp = `
   { "ab" :  "hello world" ,
   "cd": [ { "foo": 123}, { "bar": "goo\\\\gle"
  }
  ],
  "ef" :  123.45e-13
  }
  `;

  const ast = new Parser (new Lexer(exp).lex()).parse();
  expect(ast).toEqual(data)
})
