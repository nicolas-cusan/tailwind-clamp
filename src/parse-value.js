export const parseValue = (value) => {
  const number = parseFloat(value);
  let unit = 'unsupported';

  if (/^\d+$/.test(value)) {
    unit = 'px';
  }

  const match = value.match(/px|rem|em/);
  if (match) {
    unit = match[0];
  }

  return { number, unit };
};
