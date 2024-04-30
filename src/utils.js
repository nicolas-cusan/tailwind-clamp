// https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/

const clamp = (_start, _end, minvw = 375, maxvw = 1440) => {
  let start = _start;
  let end = _end;
  let negative = false;

  if (_end < _start && _start < 0 && _end < 0) {
    start = Math.abs(_start);
    end = Math.abs(_end);
    negative = true;
  } else if (_end < _start && _start > 0 && _end > 0) {
    start = _start * -1;
    end = _end * -1;
    negative = true;
  } else if (_end < _start) {
    start = Math.abs(_start) * -1;
    end = Math.abs(_end);
    negative = true;
  }

  const rem = (px) => `${px / 16}rem`;
  const factor = (1 / (maxvw - minvw)) * (end - start);
  const calc = `${rem(start - minvw * factor)} + ${100 * factor}vw`;

  const value = `clamp(${rem(start)}, ${calc}, ${rem(end)})`;

  return negative ? `calc(${value} * -1)` : value;
};

const clampFs = (start, end, tracking = null, minvw = 375, maxvw = 1440) => {
  const [startFs, startLh] = start;
  const [endFs, endLh] = end;

  const sameLh =
    (startFs == startLh && endFs === endLh) ||
    startLh / startFs === endLh / endFs;

  const settings = [
    clamp(startFs, endFs, minvw, maxvw),
    {
      lineHeight: sameLh
        ? startLh / startFs
        : clamp(startLh, endLh, minvw, maxvw),
    },
  ];

  if (tracking) {
    settings[1].letterSpacing = tracking;
  }

  return settings;
};

const setupClamp = (
  options = {
    minViewportWidth: 375,
    maxViewportWidth: 1440,
  }
) => {
  return {
    clamp: (
      start,
      end,
      minvw = options.minViewportWidth,
      maxvw = options.maxViewportWidth
    ) => clamp(start, end, minvw, maxvw),
    clampFs: (
      start,
      end,
      tracking = null,
      minvw = options.minViewportWidth,
      maxvw = options.maxViewportWidth
    ) => clampFs(start, end, tracking, minvw, maxvw),
  };
};

module.exports = {
  clamp,
  clampFs,
  setupClamp,
};
