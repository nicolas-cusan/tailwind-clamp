// https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/

const clamp = (_min, _max, minvw = 375, maxvw = 1440) => {
  let min = _min;
  let max = _max;
  let negative = false;

  if (_max < _min && _min < 0 && _max < 0) {
    min = Math.abs(_min);
    max = Math.abs(_max);
    negative = true;
  } else if (_max < _min && _min > 0 && _max > 0) {
    min = _min * -1;
    max = _max * -1;
    negative = true;
  } else if (_max < _min) {
    min = Math.abs(_min) * -1;
    max = Math.abs(_max);
    negative = true;
  }

  const rem = (px) => `${px / 16}rem`;
  const factor = (1 / (maxvw - minvw)) * (max - min);
  const calc = `${rem(min - minvw * factor)} + ${100 * factor}vw`;

  const value = `clamp(${rem(min)}, ${calc}, ${rem(max)})`;

  return negative ? `calc(${value} * -1)` : value;
};

const clampFs = (min, max, tracking = null, minvw = 375, maxvw = 1440) => {
  const [minFs, minLh] = min;
  const [maxFs, maxLh] = max;

  const sameLh =
    (minFs == minLh && maxFs === maxLh) || minLh / minFs === maxLh / maxFs;

  const settings = [
    clamp(minFs, maxFs, minvw, maxvw),
    { lineHeight: sameLh ? minLh / minFs : clamp(minLh, maxLh, minvw, maxvw) },
  ];

  if (tracking) {
    settings[1].letterSpacing = tracking;
  }

  return settings;
};

module.exports = {
  clamp,
  clampFs,
};
