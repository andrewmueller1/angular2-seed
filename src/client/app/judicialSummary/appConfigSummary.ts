import {AppConfig} from '../judicialWorkbench/index';
export class AppConfigSummary extends AppConfig {
    public static getTemplatePath() {
        if(AppConfigSummary.environment === 'prod') {
            return '/judicialsummary/js/dist/prod';
        } else {
            return '/judicialsummary/js/dist/dev';
        }
    }
}