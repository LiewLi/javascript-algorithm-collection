function kmp(pattern, text) {
  if (text.length < pattern.length) return []
  const lpsArr = lps(pattern)

  let i = 0
  let j = 0
  const ret = []
  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++
      j++
    }
    if (j >= pattern.length) {
      ret.push(i - j)
      j = lpsArr[j-1]
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j) {
        j = lpsArr[j - 1]
      } else {
        i++
      }
    }
  }
  return ret
}

function lps(pattern) {
  let len = 0
  let i = 1
  const arr = [0]

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      arr[i] = ++len
      ++i
    } else {
      if (len) {
        len = arr[len-1]
      } else {
        len = 0
        arr[i++] = 0
      }
    }
  }
  return arr
}

module.exports = {
  kmp
}
