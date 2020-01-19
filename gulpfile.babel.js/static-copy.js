/*
 * @Author: Liliang Zhu 
 * @Date: 2020-01-18 18:18:18 
 * @Last Modified by:   Liliang Zhu 
 * @Last Modified time: 2020-01-18 18:18:18 
 * 复制静态资源
 */
// gulp模块
import {
  src,
  dest,
} from 'gulp';

let copyFile = (file, dist) => {
  return src([file + 'fonts*/**', file + 'images*/**'])
    .pipe(dest(dist));
}

export default copyFile;