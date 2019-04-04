import createAPIServices from "./createAPIServices"

const api = createAPIServices()

export const getListContests = (page = 1, limit = 10) => {
    return api.makeAuthRequest({
        url: '/contests',
        method: 'GET',
        params: {
            page,
            limit
        }
    })
}

export const getContestDetail = (id) => {
    return api.makeAuthRequest({
        url: `/contests/${id}`,
        method: 'GET',
    })
}

export const getListIssues = (id) => {
    return api.makeAuthRequest({
        url: `/contests/${id}/issues`,
        method: 'GET',
    })
}

export const getListTasks = (id) => {
    return api.makeAuthRequest({
        url: `/contests/${id}/tasks`,
        method: 'GET',
    })
}

