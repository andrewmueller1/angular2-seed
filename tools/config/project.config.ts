import { join } from 'path';

import { SeedConfig } from './seed.config';
import { InjectableDependency } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      { src: 'bootstrap/dist/css/bootstrap.css', inject: true },
      { src: 'codemirror/lib/codemirror.js', inject: 'libs' },
      { src: 'codemirror/lib/codemirror.css', inject: true },
      { src: 'codemirror/mode/xml/xml.js', inject: 'libs' },
      { src: 'codemirror/mode/markdown/markdown.js', inject: 'libs' },
      { src: 'codemirror/addon/mode/overlay.js', inject: 'libs' },
      { src: 'clipboard/dist/clipboard.js', inject: 'libs' },
      { src: 'typescript-collections/dist/lib/umd.js', inject: 'libs' }
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    this.APP_ASSETS = this.APP_ASSETS.concat([
      { src: this.ASSETS_SRC + '/workbench.js', inject: 'libs' },
      { src: this.ASSETS_SRC + '/codemirrorSpellcheck/spell-checker.js', inject: 'libs' },
      { src: this.ASSETS_SRC + '/codemirrorSpellcheck/typo.js', inject: 'libs' },
    ]);

    // Setup SystemJS module config for non-seed references.
    // Package config paths.
    this.SYSTEM_CONFIG_DEV.packageConfigPaths.push(`${this.APP_BASE}node_modules/@angular2-material/*/package.json`);

    // Library paths.
    this.SYSTEM_CONFIG_DEV.paths['@angular2-material/core'] = `${this.APP_BASE}node_modules/@angular2-material/core/core.js`;
    this.SYSTEM_CONFIG_DEV.paths['@angular2-material/tabs'] = `${this.APP_BASE}node_modules/@angular2-material/tabs/tabs.js`;

    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/core'] = {
      main: 'core.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/core'] = {
      main: 'core.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/tabs'] = {
      main: 'tabs.js',
      defaultExtension: 'js'
    };

    /* Add to or override NPM module configurations: */
    //this.mergeObject( this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false } );
  }
}
