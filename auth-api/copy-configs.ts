import * as shell from 'shelljs';

shell.cp('-R', 'config', 'dist/');
shell.cp('.env', 'dist/');
