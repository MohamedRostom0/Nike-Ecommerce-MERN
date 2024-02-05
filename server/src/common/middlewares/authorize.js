const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponce(
          `User role ${req.user.role} is unauthorized for this route`,
          403
        )
      );
    }
    next();
  };
};

export default authorize;
