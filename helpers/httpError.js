const errorMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const HttpError = (status, messsage = errorMessageList[status]) => {
  const error = new Error(messsage);
  error.status = status;
  return error;
};

module.exports = HttpError;
