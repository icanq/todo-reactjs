module.exports = (err, req, res, next) => {
  let status, message
  switch (err.name) {
    case 'ValidationError':
      status = 422
      message = []
      for (const path in err.errors) {
        message.push(err.errors[path].message)
      }
      break;
    default:
      status = err.status || 500
      message = err.message || "INTERNAL_SERVER_ERROR"
      break;
  }
  res.status(status).json(message)
}