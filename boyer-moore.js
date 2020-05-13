function boyer_moore_search(pattern, text) {
  const bad_char_map = bad_char_heuristic(pattern)
  const ret = []

  let s = 0
  const m = pattern.length
  const n = text.length

  while (s <= n - m) {
    let i = m - 1
    while (i >= 0 && text[s + i] == pattern[i]) --i;
    if (i < 0) {
      ret.push(s)
      s += (s + m < n) ? m - (bad_char_map[text[s + m]] || 0) : 1
    } else {
      s += Math.max(i - bad_char_map[text[s + i]] || 0, 1)
    }
  }

  return ret
}

// Bad char heuristic
function bad_char_heuristic(pattern) {
  const map = {}
  for (let i = 0; i < pattern.length; ++i) {
    map[pattern[i]] = i;
  }
  return map
}


module.exports = {
  boyer_moore_search
}
