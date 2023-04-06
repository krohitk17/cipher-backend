class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  ConflictError,
};
