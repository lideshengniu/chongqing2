import path, { resolve } from "path"
import type { ConfigEnv } from "vite"
import { defineConfig, loadEnv } from "vite"
import postcsspxtoviewport from "postcss-px-to-viewport-8-plugin"
import vue from "@vitejs/plugin-vue"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import eslintPlugin from "vite-plugin-eslint"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
// ant-design-vue
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
// import mars3dCesium from "vite-plugin-mars3d"
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { createStyleImportPlugin, AndDesignVueResolve } from "vite-plugin-style-import"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import OptimizationPersist from "vite-plugin-optimize-persist"
import PkgConfig from "vite-plugin-package-config"
import mars3dCesium from "vite-plugin-mars3d"
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir)
}
const pathSrc = path.resolve(__dirname, "src")
export default ({ mode }: ConfigEnv) => {
  const root = process.cwd()

  const ENV = loadEnv(mode, root)
  console.log(ENV)
  console.log(`当前环境信息：`, mode)
  console.log(`ENV：`, ENV)

  return defineConfig({
    base: ENV.VITE_BASE_URL,
    server: {
      host: "localhost",
      https: false,
      port: 3028,
      proxy: {
        "/test": {
          target: "http://124.221.236.190:9001/geoserver/wfs",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/test/, "")
        }
        // "/forms": {
        //   target: "http://1.14.72.127",
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/forms/, "")
        // }
      }
    },
    define: {
      "process.env": {
        mode: mode,
        BASE_URL: ENV.VITE_BASE_URL,
        API_BASE: ENV.VITE_API_BASE
      },
      buildTime: new Date()
    },
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve("src") + "/"
        },
        {
          find: /@mars\//,
          replacement: pathResolve("src/marsgis") + "/"
        },
        {
          find: /@photo\//,
          replacement: pathResolve("public") + "/"
        }
      ],
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"]
    },
    optimizeDeps: {
      include: ["kml-geojson", "@mars/common/store/widget"]
    },
    json: {
      // 支持从 .json 文件中进行按名导入
      namedExports: true,
      stringify: false
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          out: false,
          additionalData: `@import "${path.resolve(__dirname, "src/marsgis/components/mars-ui/base.less")}";`
        }
      },
      postcss: {
        plugins: [
          postcsspxtoviewport({
            unitToConvert: "px", // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ["*"], // 能转化为vw的属性列表
            viewportUnit: "vw", // 希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: "vw", // 横屏时使用的单位
            landscapeWidth: 1920 // 横屏时使用的视口宽度
          })
        ]
      }
    },
    build: {
      // 输出路径
      outDir: path.join("./dist", ENV.VITE_BASE_URL),
      // 小于此阈值的导入或引用资源将内联为 base64 编码， 以避免额外的http请求， 设置为 0, 可以完全禁用此项，
      assetsInlineLimit: 4096,
      // 启动 / 禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 soutrce map 文件
      sourcemap: false,
      // 自定义rollup-commonjs插件选项
      commonjsOptions: {
        include: /node_modules|src\/marsgis\/common\/store/
      },
      // 自定义底层的 Rollup 打包配置
      // rollupOptions: {
      //   input: {
      //     index: path.resolve(__dirname, "index.html"),
      //     demo: path.resolve(__dirname, "demo.html")
      //   }
      // },
      // 当设置为 true, 构建后将会生成 manifest.json 文件
      manifest: false,
      // 设置为 false 可以禁用最小化混淆,或是用来指定是应用哪种混淆器 boolean | 'terser' | 'esbuild'
      minify: "terser",
      // 传递给 Terser 的更多 minify 选项
      terserOptions: {},
      // 设置为false 来禁用将构建好的文件写入磁盘
      write: true,
      // 默认情况下 若 outDir 在 root 目录下， 则 Vite 会在构建时清空该目录。
      emptyOutDir: true
    },
    plugins: [
      vue(),
      eslintPlugin({ cache: false }),
      // PkgConfig(),
      // OptimizationPersist(),
      mars3dCesium(),
      // mars3dCesium(),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
        libs: [
          {
            libraryName: "ant-design-vue",
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            }
          }
        ]
      }),

      Components({
        resolvers: [IconsResolver({ enabledCollections: ["ep"] })],
        dts: path.resolve(pathSrc, "components.d.ts")
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: "src/auto-import.d.ts",
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true //
        },
        resolvers: [IconsResolver({ prefix: "Icon" }), AntDesignVueResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "[name]"
      }),
      Icons({ autoInstall: true })
    ]
  })
}
