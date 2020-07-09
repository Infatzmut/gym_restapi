module.exports = (err, req, res, next) => {
    const httpStatus = err.status || 500;
    console.log(err)
    return res.status(httpStatus).send({
        status: httpStatus,
        message: err.message || "Internal Server Error"
    });
}