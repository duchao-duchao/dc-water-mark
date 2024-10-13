export const isNullOrUndefined = (n: any) => {
    return n === null || n === undefined;
}

export const isFunction = (n: any) => {
    return typeof n === 'function'
}

export const isDom = (n: any) => {
    if (typeof HTMLElement === 'object') {
        return n instanceof HTMLElement
    }
    return n && (typeof n ==='object') && (n.nodeType === 1) && (typeof n.nodeName === 'string')
}