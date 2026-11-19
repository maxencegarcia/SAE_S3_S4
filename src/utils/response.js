export function okResponse(data) {
    return { error: 0, status: 200, data }
}

export function errorResponse(status, message) {
    return { error: 1, status, data: message }
}