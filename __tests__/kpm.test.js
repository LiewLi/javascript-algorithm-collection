const {kmp} = require('../kmp')



test("kmp search", () => {
  const text = "ABABDABACDABABCABAB"
  const pattern = "ABAB"
  const indexes = kmp(pattern, text)
  expect(indexes).toEqual([0, 10, 15])
})

