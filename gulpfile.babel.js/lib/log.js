'use strict';

import path from 'path';
import gulp from 'gulp';
import prettyTime from 'pretty-time';

import {log, colors} from 'gulp-util';
const {cyan, magenta} = colors;
import {ROOT} from '../config';

export function logDeleted(paths) {
  console.log('Deleted files and folders:');
  logPaths(paths);
}

export function reformatGulpLog() {
  const map = new Map([
    ['task_start',
      event => {
        log(`=> started  : ${cyan(event.task)} ...`);
      }
    ],
    ['task_stop',
      event => {
        const time = prettyTime(event.hrDuration, 'ms');
        log(`=> finished : ${cyan(event.task)} after ${time}`);
      }
    ]
  ]);

  gulp.on('start', () => {
    map.forEach((callback, event) => {
      const defaultFn = gulp.listeners(event)[0];
      gulp.removeListener(event, defaultFn);
      gulp.on(event, callback);
    });
  });
}

function logPaths(paths) {
  if (paths.length === 0) {
    return console.log('Nothing.');
  }
  paths.forEach(p => console.log(magenta(path.relative(ROOT, p))));
}

export function logRebuilding() {
  return console.log('\nrebuilding...');
}
