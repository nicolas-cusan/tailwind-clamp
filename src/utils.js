// https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/

export const clamp = (_start, _end, _minvw = 375, _maxvw = 1440) => {
  const unit = _start.unit;

  let start = _start.number;
  let end = _end.number;
  let negative = false;

  const minvw = unit.match(/(rem|em)/) ? _minvw / 16 : _minvw;
  const maxvw = unit.match(/(rem|em)/) ? _maxvw / 16 : _maxvw;

  // const minvw = _minvw;
  // const maxvw = _maxvw;

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
  const calc = `${start - minvw * slope}${unit} + ${100 * slope}vw`;

  const value = `clamp(${start}${unit}, ${calc}, ${end}${unit})`;

  return negative ? `calc(${value} * -1)` : value;
};

// export const clampFs = (
//   start,
//   end,
//   tracking = null,
//   minvw = 375,
//   maxvw = 1440
// ) => {
//   const [startFs, startLh] = start;
//   const [endFs, endLh] = end;

//   const sameLh =
//     (startFs == startLh && endFs === endLh) ||
//     startLh / startFs === endLh / endFs;

//   const settings = [
//     clamp(startFs, endFs, minvw, maxvw),
//     {
//       lineHeight: sameLh
//         ? startLh / startFs
//         : clamp(startLh, endLh, minvw, maxvw),
//     },
//   ];

//   if (tracking) {
//     settings[1].letterSpacing = tracking;
//   }

//   return settings;
// };

// export const setupClamp = (
//   options = {
//     minViewportWidth: 375,
//     maxViewportWidth: 1440,
//   }
// ) => {
//   return {
//     clamp: (
//       start,
//       end,
//       minvw = options.minViewportWidth,
//       maxvw = options.maxViewportWidth
//     ) => clamp(start, end, minvw, maxvw),
//     clampFs: (
//       start,
//       end,
//       tracking = null,
//       minvw = options.minViewportWidth,
//       maxvw = options.maxViewportWidth
//     ) => clampFs(start, end, tracking, minvw, maxvw),
//   };
// };
