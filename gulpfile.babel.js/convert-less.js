/*
 * @Author: Liliang Zhu 
 * @Date: 2020-01-18 18:18:52 
 * @Last Modified by:   Liliang Zhu 
 * @Last Modified time: 2020-01-18 18:18:52 
 * 编译less
 */

// gulp模块
import {
  src,
  dest,
  lastRun
} from 'gulp';

// less语法转译
import less from 'gulp-less';
// css添加前缀
import lessAutoperfix from 'less-plugin-autoprefix';
// 压缩css
import mixCss from 'gulp-clean-css';
// 仅编译改变的文件
import changed from 'gulp-changed';
// 重命名
import rename from 'gulp-rename';
// 生成版本号
import rev from 'gulp-rev';
// 本地服务同步刷新
import browser from 'browser-sync';
const browserSync = browser.create();

// css编译前缀
const autoprefix = new lessAutoperfix({
  browsers: [
    ">0.25%",
    "last 2 version",
  ]
});

let convertLess = (file, dist) => {
  return src(file + 'css/*.less', {
      since: lastRun(convertLess, 100)
    })
    .pipe(less({
      plugins: [autoprefix]
      // 生成前缀
    }))
    .pipe(mixCss({
      keepSpecialComments: '*'
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }))
    .pipe(rename(path => path.basename += '.min'))
    .pipe(rev())
    .pipe(dest(dist + 'css'))
    .pipe(rev.manifest())
    .pipe(dest(file + 'mapjson/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

export default convertLess;