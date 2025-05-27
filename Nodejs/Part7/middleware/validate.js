function validate(schema, type = 'body') {
  return (req, res, next) => {
    const data = req[type];
    const result = schema.safeParse(data);


    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }
    
    req[type] = result.data;
    next();
  };
}


module.exports = validate;
