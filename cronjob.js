import { spawn } from 'child_process';

// Execute npm run dev command
const childProcess = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });

childProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`Process exited with code ${code}`);
  }
});
