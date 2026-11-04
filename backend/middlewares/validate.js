/**
 * Zod validation middleware factory.
 * Usage: validate(schema) as Express middleware.
 *
 * Parses req.body against the provided Zod schema.
 * On success: replaces req.body with sanitized/transformed data and calls next().
 * On failure: returns 400 with structured error messages.
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  // Replace body with sanitized & transformed data
  req.body = result.data;
  next();
};
