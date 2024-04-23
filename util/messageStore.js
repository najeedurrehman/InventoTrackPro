class messageStore {
  static internalServerError(err) {
    return {
      message:
        "An error occurred while creating the record. Please try again later.",
      cause: err,
    };
  }
}

module.exports = messageStore;