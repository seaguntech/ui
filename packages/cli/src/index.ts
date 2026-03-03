import { runComponentsAdd } from './commands/components-add.js';
import { runComponentsList } from './commands/components-list.js';
import { runComponentsSearch } from './commands/components-search.js';
import { runDoctor } from './commands/doctor.js';
import { runInit } from './commands/init.js';
import { error } from './core/logger.js';
import { Command } from 'commander';

type SharedOptions = {
  cwd: string;
  registry?: string;
};

type AddOptions = SharedOptions & {
  yes?: boolean;
  skipInstall?: boolean;
  dryRun?: boolean;
};

type InitOptions = SharedOptions & {
  force?: boolean;
};

const program = new Command();

program.name('seagun').description('Seaguntech UI native CLI').version('0.1.0');

program
  .command('init')
  .description('Initialize local .seagun config')
  .option('--cwd <path>', 'Target project directory', process.cwd())
  .option('--registry <url>', 'Override registry URL')
  .option('--force', 'Overwrite existing config', false)
  .action(async (options: InitOptions) => {
    await runInit(options);
  });

const components = program
  .command('components')
  .description('Manage Seaguntech registry components');

components
  .command('add')
  .description('Add one or many components to current project')
  .argument('<names...>', 'Component names')
  .option('--cwd <path>', 'Target project directory', process.cwd())
  .option('--registry <url>', 'Override registry URL')
  .option('--yes', 'Overwrite conflicting files', false)
  .option('--skip-install', 'Skip npm dependency install', false)
  .option('--dry-run', 'Preview file writes and installs only', false)
  .action(async (names: string[], options: AddOptions) => {
    await runComponentsAdd(names, options);
  });

components
  .command('list')
  .description('List all available registry items')
  .option('--cwd <path>', 'Target project directory', process.cwd())
  .option('--registry <url>', 'Override registry URL')
  .action(async (options: SharedOptions) => {
    await runComponentsList(options);
  });

components
  .command('search')
  .description('Search registry items by keyword')
  .argument('<keyword>', 'Keyword')
  .option('--cwd <path>', 'Target project directory', process.cwd())
  .option('--registry <url>', 'Override registry URL')
  .action(async (keyword: string, options: SharedOptions) => {
    await runComponentsSearch(keyword, options);
  });

program
  .command('doctor')
  .description('Validate local environment and registry connectivity')
  .option('--cwd <path>', 'Target project directory', process.cwd())
  .option('--registry <url>', 'Override registry URL')
  .action(async (options: SharedOptions) => {
    await runDoctor(options);
  });

program.parseAsync(process.argv).catch((commandError: unknown) => {
  error(
    commandError instanceof Error ? commandError.message : String(commandError),
  );
  process.exit(1);
});
