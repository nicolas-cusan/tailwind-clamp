export const log = {
  error() {
    console.log('\x1b[31m', ...arguments, '\x1b[0m');
  },
  warn() {
    console.log('\x1b[33m', ...arguments, '\x1b[0m');
  },
  info() {
    console.log('\x1b[34m', ...arguments, '\x1b[0m');
  },
  log() {
    console.log('\x1b[90m', ...arguments, '\x1b[0m');
  },
};
