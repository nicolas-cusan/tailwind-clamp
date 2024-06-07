import chalk from 'chalk';

export const log = {
  error() {
    console.log(chalk.red(...arguments));
  },
  warn() {
    console.log(chalk.yellow(...arguments));
  },
  info() {
    console.log(chalk.blue(...arguments));
  },
  log() {
    console.log(chalk.gray(...arguments));
  },
};
