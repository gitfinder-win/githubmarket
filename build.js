import { build } from 'vite';
import { execSync } from 'child_process';

console.log('Starting build...');

// 清理旧的构建
try {
  execSync('rm -rf dist', { stdio: 'inherit' });
} catch (e) {
  // 目录不存在，忽略错误
}

// 运行 Vite 构建
build({
  configFile: './vite.config.js',
  mode: 'production'
}).then(() => {
  console.log('Build completed successfully!');
  console.log('Check the dist directory for output.');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
