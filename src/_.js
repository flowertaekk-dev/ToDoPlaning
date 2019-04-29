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

export function _replaceHyphen (str) {
    return str.replace(/-/g, '')
}

// help functions

function _keys(obj) {
    return typeof obj === 'object' && !!obj ? Object.keys(obj) : []
}

