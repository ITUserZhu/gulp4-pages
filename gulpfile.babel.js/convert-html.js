/*
 * @Author: Liliang Zhu 
 * @Date: 2020-01-18 18:18:31 
 * @Last Modified by:   Liliang Zhu 
 * @Last Modified time: 2020-01-18 18:18:31 
 * 编译html
 */

// gulp模块
import {
  src,
  dest,
} from 'gulp';

// 替换html样式与脚本路径
import revCollector from 'gulp-rev-collector';
// 压缩html
import minHtml from 'gulp-htmlmin';
import replace from 'gulp-replace';
// 本地服务同步刷新
import browser from 'browser-sync';
const browserSync = browser.create();

// twig模板编译报错处理
const reg_open = /\{\% if[^}]+\%\}/;
const reg_close = /\{\%[^}]+endif \%\}/;
const reg_box = [reg_open, reg_close];
// 正则匹配编译多余空格问题
const rmspaceOpen = /\%\}\s+\{\{/g;
const rmspaceClose = /\}\}\s+\{\%/g;

let convertHtml = (file, dist, basePath) => {
  return src([file + 'mapjson/*/*.json', file + 'pages/**'])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        'js': basePath + 'js/',
        'css': basePath + 'css/'
      }
    }))
    .pipe(minHtml({
      collapseWhitespace: true,
      removeComments: false,
      removeEmptyAttributes: true,
      customAttrSurround: [reg_box],
      ignoreCustomFragments: [reg_open]
    }))
    .pipe(replace(rmspaceOpen, '%}{{'))
    .pipe(replace(rmspaceClose, '}}{%'))
    .pipe(dest(dist))
    .pipe(browserSync.reload({
      stream: true
    }));
}

export default convertHtml;