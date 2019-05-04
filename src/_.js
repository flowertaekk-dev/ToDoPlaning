export function _filter(obj, pred) {
    let result = []
    _each(obj, function(val) {
        if (pred(val)) {
            result.push(val)
        }
    })
    return result
}

export function _each(list, iter) {
    let keys = _keys(list)
    for (let i=0; i<keys.length; i++) {
        iter(list[keys[i]])
    }
    return list
}

export function _map(obj, mapper) {
    let result = []
    _each(obj, function(val){
        result.push(mapper(val))
    })
    return result
}

// makes new array that has "key" value within Object
export function _mapWithKeys(obj) {
    let result = []
    let keys = _keys(obj)
    for (let i=0; i<keys.length; i++) {
        // wanted to set "key" as a key value but, it seems to be a reserved word..
        result.push({index: keys[i], ...obj[keys[i]]})
    }
    return result
}

export function _replaceHyphen (str) {
    return str.replace(/-/g, '')
}

// help functions

function _keys(obj) {
    return typeof obj === 'object' && !!obj ? Object.keys(obj) : []
}

