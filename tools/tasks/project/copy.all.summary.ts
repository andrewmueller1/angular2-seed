import * as gulp from 'gulp';
import { join } from 'path';
import { APP_DEST, APP_SRC, SYSTEM_CONFIG, DIST_DIR } from '../../config';
//import fs = require('fs');

/**
 * This sample task copies all TypeScript files over to the appropiate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
   return gulp.src(DIST_DIR + '/**/*').pipe(gulp.dest('D:/hubert/apache-tomcat-6.0.18/webapps/judicialsummary/js/dist'));
};
