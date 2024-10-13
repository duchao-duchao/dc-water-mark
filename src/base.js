export const isNullOrUndefined = (n) => {
    return n === null || n === undefined;
}

export const isFunction = (n) => {
    return typeof n === 'function'
}

export const isDom = (n) => {
    if (typeof HTMLElement === 'object') {
        return n instanceof HTMLElement
    }
    return n && (typeof n ==='object') && (n.nodeType === 1) && (typeof n.nodeName === 'string')
}