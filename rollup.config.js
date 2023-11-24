import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import path from 'path'
import { fileURLToPath } from 'url'

const extensions = ['.ts', '.js', '.tsx', '.jsx']

// 计算__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 输出es、cjs、umd三种格式
export default {
  input: './src/index.ts',
  // preserveEntrySignatures: 'strict',
  external: ['lodash-es'],
  output: [
    {
      format: 'es',
      exports: 'named',
      name: 'utils',
      entryFileNames: '[name].js',
      preserveModules: true, // 保留模块
      preserveModulesRoot: './src',
      esModule: true,
      dir: 'lib',
      inlineDynamicImports: false,
      minifyInternalExports: false, // 最小化内部导出
      indent: true,
      globals: {
        'lodash-es': 'lodashEs',
      },
    },
    {
      dir: 'lib/cjs', // 输出目录
      format: 'cjs',
      name: 'utils',
      exports: 'named',
      entryFileNames: '[name].js', //打包后文件名
      preserveModules: true, // 保留模块
      preserveModulesRoot: './src', // 保留模块根目录
      inlineDynamicImports: false, // 内联动态导入
      minifyInternalExports: false, // 最小化内部导出
      indent: true, // 格式化输出
      globals: {
        'lodash-es': 'lodashEs',
      },
    },
    {
      file: 'lib/umd/index.js',
      format: 'umd',
      name: 'utils',
      exports: 'named',
      sourcemap: false,
      inlineDynamicImports: true,
      minifyInternalExports: false, // 最小化内部导出
      indent: true,
    },
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          rootDir: './src',
          baseUrl: './src', // 指定解析非相对模块名称的基目录。
          target: 'esnext',
          module: 'esnext',
          declaration: true,
          declarationMap: true,
        },
        // include: ['*.ts+(|x)', '**/*.ts+(|x)'],
        include: ['./src/**/*'],
        exclude: ['node_modules', 'dist', 'es', 'lib'],
      },
    }),
    babel({
      extensions,
      babelHelpers: 'bundled', // 生成的代码中不再包含babel的辅助函数，而是直接引用babel的辅助函数
      exclude: 'node_modules/**',
    }),
    resolve({
      mainFields: ['module', 'main', 'browser'], // 定义入口文件的查找顺序
      preferBuiltins: false, // 是否优先使用node内置模块
    }),
    commonjs({
      extensions, // 配置需要转换的模块文件扩展名
      sourceMap: false, // 是否为CommonJS模块生成sourceMap
    }),
  ],
}