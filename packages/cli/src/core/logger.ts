export function info(message: string) {
  process.stdout.write(`${message}\n`);
}

export function warn(message: string) {
  process.stderr.write(`WARN: ${message}\n`);
}

export function error(message: string) {
  process.stderr.write(`ERROR: ${message}\n`);
}
