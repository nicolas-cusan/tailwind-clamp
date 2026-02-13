// https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/

export const clamp = (
  _start,
  _end,
  _minvw = { number: 23.4375, unit: 'rem' },
  _maxvw = { number: 90, unit: 'rem' },
  useContainer = false
) => {
  const unit = _start.unit === 'zero' ? _end.unit : _start.unit;
  const isPx = unit === 'px';

  let start = _start.number;
  let end = _end.number;
  let negative = false;

  let minvw = _minvw.number;
  let maxvw = _maxvw.number;

  if (_minvw.unit !== 'px' && isPx) {
    minvw = _minvw.number * 16;
  }

  if (_minvw.unit === 'px' && !isPx) {
    minvw = _minvw.number / 16;
  }

  if (_maxvw.unit !== 'px' && isPx) {
    maxvw = _maxvw.number * 16;
  }

  if (_maxvw.unit === 'px' && !isPx) {
    maxvw = _maxvw.number / 16;
  }

  if (end < start && start < 0 && end < 0) {
    start = Math.abs(start);
    end = Math.abs(end);
    negative = true;
  } else if (end < start && start > 0 && end > 0) {
    start = start * -1;
    end = end * -1;
    negative = true;
  } else if (end < start) {
    start = Math.abs(start) * -1;
    end = Math.abs(end);
    negative = true;
  }

  const slope = (end - start) / (maxvw - minvw);
  const calc = `${(start - minvw * slope).toFixed(6)}${unit} + ${(
    100 * slope
  ).toFixed(6)}${useContainer ? 'cqw' : 'vw'}`;

  const value = `clamp(${start}${unit}, ${calc}, ${end}${unit})`;

  return negative ? `calc(${value} * -1)` : value;
};
