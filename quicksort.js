function quicksort(A, lo, hi) {
  if (lo >= hi) return
  let pivot = partition(A, lo, hi)
  quicksort(A, lo, pivot - 1)
  quicksort(A, pivot + 1, hi)
}

function partition(A, lo, hi) {
  let pivot = A[hi]
  let i = lo
  for (let j = lo; j < hi; ++j) {
    if (A[j] < pivot) {
      [A[j], A[i]] = [A[i], A[j]]
      i++
    }
  }
  [A[i], A[hi]] = [A[hi], A[i]]
  return i
}


const A = [7, 3, 1, 4, 8, 10, 2, 1, 5, 4]
console.log(A)
quicksort(A, 0, A.length-1)
console.log(A)
