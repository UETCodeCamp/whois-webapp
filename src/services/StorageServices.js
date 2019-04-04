import store from 'store'

const _prefix = 'com.dhpg.'

const _getRealKey = (key, noPrefix = false) => {
    if (noPrefix) {
        return key
    }

    return _prefix + key
}

export const removeLocalData = (key, noPrefix = false) => {
    const realKey = _getRealKey(key, noPrefix)

    return store.remove(realKey)
    //return localStorage.removeItem(realKey)
}

export const getLocalData = (key, defaultValue = null, noPrefix = false) => {
    const realKey = _getRealKey(key, noPrefix)

    const value = store.get(realKey) || defaultValue
    //const value = localStorage.getItem(realKey) || defaultValue

    try {
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}

export const setLocalData = (key, value, noPrefix = false) => {
    const realKey = _getRealKey(key, noPrefix)

    const type = typeof(value)
    if (type === 'object') {
        value = JSON.stringify(value)
    }

    store.set(realKey, value)
    //localStorage.setItem(realKey, value)

    return value
}
