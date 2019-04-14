import createAPIServices from "./createAPIServices"

const api = createAPIServices()

export const getListJobs = (page = 1, limit = 100) => {
    return api.makeAuthRequest({
        url: '/jobs',
        method: 'GET',
        params: {
            page,
            limit
        }
    })
}

