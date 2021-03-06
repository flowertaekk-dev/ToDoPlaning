/* functional programming */
export function filter(obj, pred) {
  let result = []
  each(obj, function(val) {
    if (pred(val)) {
      result.push(val)
    }
  })
  return result
}

export function each(list, iter) {
  let keys = _keys(list)
  for (let i = 0; i < keys.length; i++) {
    iter(list[keys[i]])
  }
  return list
}

export function map(obj, mapper) {
  let result = []
  each(obj, function(val) {
    result.push(mapper(val))
  })
  return result
}

// makes new array that has "key" value within Object
export function mapWithKeys(obj) {
  let result = []
  let keys = _keys(obj)
  for (let i = 0; i < keys.length; i++) {
    // wanted to set "key" as a key value but, it seems to be a reserved word..
    result.push({ index: keys[i], value: obj[keys[i]] })
  }
  return result
}

export function replaceHyphen(str) {
  return str.replace(/-/g, "")
}

function _keys(obj) {
  return typeof obj === "object" && !!obj ? Object.keys(obj) : []
}

/**
 * returns Object if it is not null. otherwise returns null
 * @param {Any} obj
 */
export function requireNonNull(obj) {
  if (!!obj) {
    return obj
  } else {
    return null
  }
}

/* help functions */

export function getCurrentDate() {
  const today = new Date()

  const year = today.getFullYear()
  const month =
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1
  const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate()

  return year + "-" + month + "-" + date
}

/**
 * it returns number with prepending 0 if it is smaller than 10
 * @param {number} num
 */
export function withLeadingZero(num) {
  let target = num

  if (typeof target === "string") target = parseInt(target)

  return target < 10 ? "0" + target : target
}
