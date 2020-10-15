# 开发一个Loader
项目结构与核心代码  

```
 └─ 03-webpack-loader ······················· sample root dir

    ├── src ································· source dir

    │   ├── about.md ························ markdown module

    │   └── main.js ························· entry module

    ├── package.json ························ package file

+   ├── markdown-loader.js ·················· markdown loader

    └── webpack.config.js ··················· webpack config file

```
```
<!-- ./src/about.md -->

# About

this is a markdown file.

```
```
// ./src/main.js

import about from './about.md'

console.log(about)

// 希望 about => '<h1>About</h1><p>this is a markdown file.</p>'

```

## Loader 对资源的处理过程
- 输入：加载到的资源文件内容
- 输出：加工后的结果  

```
// ./markdown-loader.js

module.exports = source => {

  // 加载到的模块内容 => '# About\n\nthis is a markdown file.'

  console.log(source)

  // 返回值就是最终被打包的内容

  return 'hello loader ~'

}

```
```
// ./webpack.config.js

module.exports = {

  entry: './src/main.js',

  output: {

    filename: 'bundle.js'

  },

  module: {

    rules: [

      {

        test: /\.md$/,

        // 直接使用相对路径

        use: './markdown-loader'

      }

    ]

  }

```

**Webpack 加载资源文件的过程类似于一个工作管道，你可以在这个过程中依次使用多个 Loader，但是最终这个管道结束过后的结果必须是一段标准的 JS 代码字符串**  

![](img/loader.png)  

- 直接在这个 Loader 的最后返回一段 JS 代码字符串；

```
// ./markdown-loader.js

const marked = require('marked')

module.exports = source => {

  // 1. 将 markdown 转换为 html 字符串

  const html = marked(source)

  // html => '<h1>About</h1><p>this is a markdown file.</p>'

  // 2. 将 html 字符串拼接为一段导出字符串的 JS 代码

  const code = `module.exports = ${JSON.stringify(html)}`

  return code 

  // code => 'export default "<h1>About</h1><p>this is a markdown file.</p>"'

}

```

- 再找一个合适的加载器，在后面接着处理我们这里得到的结果

```
// ./markdown-loader.js

const marked = require('marked')

module.exports = source => {

  // 1. 将 markdown 转换为 html 字符串

  const html = marked(source)

  return html

}

```

```
// ./webpack.config.js

module.exports = {

  entry: './src/main.js',

  output: {

    filename: 'bundle.js',

  },

  module: {

    rules: [

      {

        test: /\.md$/,

        use: [

          'html-loader',

          './markdown-loader'

        ]

      }

    ]

  }

}

```
