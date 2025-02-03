import { log } from './log.js';

export const parseValue = (v) => {
  const value = `${v}`;
  const number = parseFloat(value);
  let unit = 'unsupported';

  if (/^\d+$/.test(value) && number !== 0) {
    unit = 'px';
  }

  const match = value.match(/px|rem|em/);
  if (match) {
    unit = match[0];
  }

  if (number === 0 && unit === 'unsupported') {
    unit = 'zero';
  }

  return { number, unit };
};

export const parseFontSizeValue = (value) => {
  const values = {};
  if (typeof value === 'string') {
    values.fontSize = parseValue(value);
  } else if (Array.isArray(value)) {
    values.fontSize = parseValue(value[0]);

    if (typeof value[1] === 'string') {
      values.lineHeight = parseValue(value[1]);
    } else if (typeof value[1] === 'object') {
      if ('lineHeight' in value[1]) {
        values.lineHeight = parseValue(value[1].lineHeight);
      }
      if ('letterSpacing' in value[1]) {
        values.letterSpacing = parseValue(value[1].letterSpacing);
      }
    }
  }
  return values;
};

export const checkValues = (start, end, value, prop = null) => {
  if (start.number === end.number) {
    log.error(
      `Same value for start an end${
        prop ? ` (${prop})` : ''
      }: "clamp-[${value}]".`
    );
    return null;
  }

  if (start.unit !== end.unit && start.unit !== 'zero' && end.unit !== 'zero') {
    log.error(
      `Units need to match${prop ? ` (${prop})` : ''}: "clamp-[${value}]"  ${
        start.unit
      } !== ${end.unit}.`
    );
    return null;
  }

  if (start.unit === 'unsupported' || end.unit === 'unsupported') {
    log.error(
      `Only px, rem and em units are supported${
        prop ? ` (${prop})` : ''
      }: "clamp-[${value}]".`
    );
    return null;
  }

  return true;
};
