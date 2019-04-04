import Axios from "axios"

const _makeRequest = createRequest => async args => {
    const _headers = args.headers ? args.headers : {}

    const defaultHeaders = {
        'X-App-Version': '1.0.0',
    }

    args = {
        ...args,
        headers: {
            ...defaultHeaders,
            ..._headers
        },
    }

    try {
        const {data} = await createRequest(args)

        return data
    } catch (e) {
        throw e
    }
}

const _makeAuthRequest = createRequest => async (args) => {
    const requestHeaders = args.headers ? args.headers : {}

    let headers = {
        'cache-control': 'no-cache',
        'pragma': 'no-cache'
    }

    args = {
        ...args,
        headers: {
            ...headers,
            ...requestHeaders
        }
    }

    return await _makeRequest(createRequest)(args)
}

export default (options = {}) => {
    const baseUrlValidated = 'https://a347ecfd.ngrok.io'
    const instance = Axios.create({
        baseURL: baseUrlValidated,
        timeout: 30000,
    })

    return {
        makeRequest: _makeRequest(instance),
        makeAuthRequest: _makeAuthRequest(instance),
    }
}
