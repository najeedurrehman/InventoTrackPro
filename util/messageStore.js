class messageStore {
  static internalServerError(err) {
    return {
      message:
        "An error occurred. Please try again later.",
      cause: err,
    };
  }
}

module.exports = messageStore;