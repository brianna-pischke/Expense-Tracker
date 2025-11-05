const notFound = (req, res, next) => {
  res.status(404);
  res.json({ message: 'Not Found' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message || 'Server Error'
  });
};

module.exports = { notFound, errorHandler };


