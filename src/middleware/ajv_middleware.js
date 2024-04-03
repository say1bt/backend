const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const isValid = schema(req.body);

    if (!isValid) {
      return res.status(400).json({
        error: "Validation error",
        details: schema.errors,
      });
    }

    next();
  };
};

export { validateRequestBody };
