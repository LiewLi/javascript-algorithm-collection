function strToBytes(str) {
    const bytes = []
    for (let i = 0; i < str.length; ++i) {
        let ch = str.charCodeAt(i)
        do {
            bytes.push(ch & 0xff)
            ch >>= 8
        } while(ch)
    }
    return bytes
}

function encode(str) {
    var encoded_str = ""
    let bytes = strToBytes(str)
    let i = 0
    while (i < bytes.length) {
       let b = bytes[i]
       let count = 0
       let next = b
       while (next === b && i < bytes.length && count < 64) {
           count++
           next = bytes[++i]
       }

        if (count > 1 || b >= 192) {
            encoded_str += String.fromCharCode(191 + count, b)
        } else {
            encoded_str += String.fromCharCode(b)
        }
    }
    return encoded_str
}

function decode(str) {
    let decoded_str = ""
    for (let i = 0; i < str.length; ++i) {
        let byte = str.charCodeAt(i) & 0xff

        if (byte < 192) {
            decoded_str += String.fromCharCode(byte)
        } else if (i + 1 < str.length) {
            let ch = str.charCodeAt(i+1) & 0xff
            for (let j = 0; j < byte - 191; ++j) {
                decoded_str += String.fromCharCode(ch)
            }
        }
    }
    return decoded_str
}

let a = "A\u1242B\u4123C"
// let a = "AAABBBBC"
console.log(a)
let rle = encode(a)
console.log(rle)
let de_rle = decode(rle)
console.log(de_rle)