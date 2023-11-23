import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
// import alias from "@rollup/plugin-alias";
// import path from 'path'

export default {
  input: "src/index.ts",
  //   es6 的包 (esm)
  // 页面中直接引入(umd)
  // 在 nodejs 环境中使用(cjs)
  output: [
    {
      file: "lib/umd/index.js",
      format: "umd",
      name: "utils",
      exports: "named",
    },
    {
      file: "lib/index.js",
      format: "es",
      name: "utils",
      exports: "named",
    },
    {
      file: "lib/cjs/index.js",
      format: "cjs",
      name: "utils",
      exports: "named",
    },
  ],
  watch: {
    // 配置监听处理
    exclude: "node_modules/**",
  },
  plugins: [
    terser(), // 压缩js
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
      },
      clean: true,
    }),
    // alias({
    //   entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
    // }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
};
