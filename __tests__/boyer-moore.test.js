const {boyer_moore_search} = require('../boyer-moore')



test("boyer moore search", () => {
  const text = "ABABDABACDABABCABAB"
  const pattern = "ABAB"
  const indexes = boyer_moore_search(pattern, text)
  expect(indexes).toEqual([0, 10, 15])
})

