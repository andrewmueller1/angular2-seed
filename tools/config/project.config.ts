import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      {src: 'codemirror/lib/codemirror.js', inject: 'libs'},
      {src: 'codemirror/lib/codemirror.css', inject: true },
      {src: 'codemirror/mode/xml/xml.js', inject: 'libs'},
      {src: 'codemirror/mode/markdown/markdown.js', inject: 'libs'},
      {src: 'codemirror/addon/mode/overlay.js', inject: 'libs'},
      {src: 'clipboard/dist/clipboard.js', inject: 'libs'},
      {src: 'typescript-collections/dist/lib/umd.js', inject: 'libs'}
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);
    
    this.APP_ASSETS = this.APP_ASSETS.concat([
      { src: this.ASSETS_SRC + '/workbench.js', inject: 'libs'},
      { src: this.ASSETS_SRC + '/codemirrorSpellcheck/spell-checker.js', inject: 'libs'},
      { src: this.ASSETS_SRC + '/codemirrorSpellcheck/typo.js', inject: 'libs'},
    ]);
  }
}
