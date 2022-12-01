import { defineConfig, loadEnv } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
// 组件样式按需加载
// import usePluginImport from 'vite-plugin-importer';
// 自动引入vue函数
import autoImport from 'unplugin-auto-import/vite';
// 添加tsx和jsx语法
import vueJsx from '@vitejs/plugin-vue-jsx';
// 打包压缩
import viteCompression from 'vite-plugin-compression';
// 在开发和构建中进行代码规范校验
import eslintPlugin from 'vite-plugin-eslint';
// 按需引入Naive
import Components from 'unplugin-vue-components/vite';
import { Vuetify3Resolver } from 'unplugin-vue-components/resolvers';

import * as path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    define: {
      'process.env': loadEnv(mode, process.cwd())
    },
    // 为服务器设置代理规则
    server: {
      host: '127.0.0.1',
      port: 3000, // 设置服务启动端口号
      strictPort: true, // 若端口被占用,直接结束项目
      https: false, // 是否开启
      cors: true, // 默认启用并允许任何源
      open: false, // 在服务器启动时自动在浏览器中打开
      hmr: {
        overlay: false
      },
      // 反向代理配置，注意rewrite写法
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      // 取相对路径别名, @表示当前的src目录路径
      alias: [
        {
          find: '@', // 别名
          replacement: path.resolve(__dirname, 'src') // 别名对应地址
        },
        {
          find: 'components',
          replacement: path.resolve(__dirname, 'src/components')
        }
      ]
    },
    // 打包相关规则
    build: {
      target: 'modules', // 指定es版本,浏览器的兼容性,es2015(编译成es5)
      outDir: 'page', // 指定打包输出路径  默认：dist
      assetsDir: 'assets', // 指定静态资源存放路径
      minify: 'terser', // 项目压缩 :boolean | 'terser' | 'esbuild'
      chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）默认：500
      cssCodeSplit: true, // css代码拆分,false则所有样式保存在一个css里面
      sourcemap: false, // 构建后是否生成 source map 文件
      cssTarget: 'chrome61', //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式
      terserOptions: {
        // 生产环境移除console
        compress: {
          drop_console: true, // 打包时删除console
          drop_debugger: true // 打包时删除 debugger
        },
        output: {
          // 去掉注释内容
          comments: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
            vue: ['vue', 'vue-router', 'vuex'],
            echarts: ['echarts']
          }
        }
      }
    },
    // 插件配置
    plugins: [
      vuePlugin({
        // 开启ref转换
        reactivityTransform: true
      }),
      eslintPlugin({
        // 禁用 eslint 缓存
        cache: false
      }),
      autoImport({
        resolvers: [],
        // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
        imports: ['vue', 'vue-router', 'pinia'],
        // 可以自定义文件生成的位置，默认是根目录下
        dts: './auto-imports.d.ts',
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      vueJsx(),
      // gzip压缩
      viteCompression(),
      Components({
        // 需要自动导入的组件
        dts: true,
        dirs: '/components.d.ts',
        resolvers: [Vuetify3Resolver()]
      })
    ],
    // 样式相关规则
    css: {
      preprocessorOptions: {
        // 导入variables.scss, 这样就可以在vue全局中使用variables.scss中定义的变量了
        scss: {
          additionalData: '@import "./src/assets/css/variables.scss";'
        }
      }
    }
  });
};
