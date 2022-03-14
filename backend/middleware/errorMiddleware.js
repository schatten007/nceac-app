const errorHandler = (err, req, res, next) => {
    // 500 =  the server encountered an unexpected condition that prevented it from fulfilling the request
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = ({
    errorHandler
})