const parse = (value) => {
  const number = parseFloat(value);
  const unit = value.match(/px|rem|em|%|vw|vh/);

  return { number, unit };
};

export const parseValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(parse);
  }

  return parse(value);
};
