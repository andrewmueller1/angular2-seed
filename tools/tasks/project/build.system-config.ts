/// <reference path="../../../typings/globals/node/index.d.ts" />
import * as gulp from 'gulp';
import { join } from 'path';
import { APP_DEST, APP_SRC, SYSTEM_CONFIG } from '../../config';
//import fs = require('fs');

/**
 * This sample task copies all TypeScript files over to the appropiate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
  var fs = require('fs');
  //fs.writeFileSync('dist/version.txt', '1.2.3');
  fs.writeFileSync(APP_DEST + '/systemConfig.js', 'System.config(' + JSON.stringify(SYSTEM_CONFIG, null, 2) + ');');
  return true;
};
