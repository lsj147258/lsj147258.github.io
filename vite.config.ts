import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 部署到 https://<用户名>.github.io 根仓库时，BASE_PATH 保持默认 '/' 即可。
// 如果以后改放到 https://<用户名>.github.io/blog 这类子路径，
// 可以用 `VITE_BASE=/blog/ npm run build` 覆盖。
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
