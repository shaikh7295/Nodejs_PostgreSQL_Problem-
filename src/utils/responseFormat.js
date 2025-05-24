const successFormat = (statusCode = 200, data = [], message = '', res) => {
    return res.status(statusCode).json({
        message: message,
        data: data,
        isError: false,
        errorDetails: [],
    })
}

const failFormat = (statusCode = 400, error = [], message = '', res) => {
    return res.status(statusCode).json({
        message: message,
        data: [],
        isError: true,
        errorDetails: error,
    })
}


module.exports = { successFormat, failFormat }