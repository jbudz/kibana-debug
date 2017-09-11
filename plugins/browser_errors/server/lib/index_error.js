function indexError(callWithRequest, req, { index, type }) {
  const timestamp = new Date().toISOString();

  return callWithRequest(req, 'index', {
    index,
    type,
    body: {
      error: {
        ...req.payload,
        timestamp
      }
    }
  });
}

export { indexError };
