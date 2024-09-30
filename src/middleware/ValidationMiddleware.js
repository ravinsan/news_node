export const ValidationMiddleware = (schem) => async (req, res, next) => {
    try {
        
      const parseBody = await schem.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err) {
      const message = err.errors[0].message;
      return res.status(400).json({ message });
    }
  };