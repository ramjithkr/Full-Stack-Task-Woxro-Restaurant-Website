const notFound = (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Route not found - ${req.originalUrl}`,
  });
};
export default notFound;