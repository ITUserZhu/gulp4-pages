import {
  series,
  parallel,
  watch,
} from 'gulp';
import del from 'del';
// 本地服务同步刷新
import browser from 'browser-sync';
const browserSync = browser.create();
// 引入功能组件
import convertLess from './convert-less';
import convertJs from './convert-js';
import convertHtml from './convert-html';
import copyFile from './static-copy';

// 是否开发环境
let isDev = true;

// 域名与站点名称
const hostName = 'test',
  hostTitle = '测试';

// 开发项目类型
const devType = 'pc';

// 本地目录
const filePath = 'project/' + devType + '/';
// 生产目录
const distResourcesPath = 'dist/' + devType + '/assets/';
const distPagesPath = 'dist/' + devType + '/view/';
// 资源路径
const basePath = '../assets/';

// 删除css文件
export const delCssFile = () => {
  return del([
    distResourcesPath + 'css'
  ])
}

// 删除js文件
export const delJsFile = () => {
  return del([
    distResourcesPath + 'js'
  ])
}

// 删除资源文件夹
export const delStaticFile = () => {
  return del([
    distResourcesPath + 'images',
    distResourcesPath + 'fonts',
  ])
}
// 导出任务
// 复制文件
export const copyStatic = cb => {
  copyFile(filePath, distResourcesPath);
  cb();
}
// 编译css
export const compileCss = series(delCssFile, cb => {
  convertLess(filePath, distResourcesPath);
  cb();
});
// 编译js
export const compileJs = series(delJsFile, cb => {
  convertJs(filePath, distResourcesPath);
  cb();
});

// 编译html
export const freshHtml = cb => {
  convertHtml(filePath, distPagesPath, basePath);
  cb();
};


// 监测文件变化
let watchFiles = () => {
  browserSync.init({});

  watch(filePath + 'css/**/*.less', {
    delay: 500,
  }, compileCss);

  watch(filePath + 'js/**/*.js', {
    delay: 500,
  }, compileJs);

  watch(filePath + 'pages/**', {
    delay: 500,
  }, freshHtml);

  watch(filePath + 'mapjson/**/*.json', {
    delay: 500,
  }, freshHtml);
}

// 默认任务
exports.default = series(parallel(compileCss, compileJs), freshHtml, copyStatic, watchFiles);