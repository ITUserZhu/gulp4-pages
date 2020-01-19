/*
 * @Author: Liliang Zhu 
 * @Date: 2020-01-18 18:19:07 
 * @Last Modified by:   Liliang Zhu 
 * @Last Modified time: 2020-01-18 18:19:07 
 * 编译js
 */

// gulp模块
import {
  src,
  dest,
} from 'gulp';

import named from 'vinyl-named';
// webpack包管理
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
// 仅编译改变的文件
import changed from 'gulp-changed';
// 重命名
import rename from 'gulp-rename';
// 生成版本号
import rev from 'gulp-rev';
// 本地服务同步刷新
import browser from 'browser-sync';
const browserSync = browser.create();

import webpackConfig from '../webpack.config';

let convertJs = (file, dist) => {
  return src(file + 'js/*.js')
    .pipe(changed(dist + 'js', {
      extension: '.js'
    }))
    .pipe(named())
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(rename(path => path.basename += '.min'))
    .pipe(rev())
    .pipe(dest(dist + 'js'))
    .pipe(rev.manifest())
    .pipe(dest(file + 'mapjson/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

export default convertJs;