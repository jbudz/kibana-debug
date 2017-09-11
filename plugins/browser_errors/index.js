import { resolve } from 'path';
import { errorApi } from './server';
import mappings from './mappings.json';

export const browserErrors =  (kibana) => {
  return new kibana.Plugin({
    id: 'browser_errors',
    publicDir: resolve(__dirname, 'public'),
    require: ['elasticsearch'],
    uiExports: {
      hacks: [
        'plugins/browser_errors/index'
      ],
      mappings
    },
    configPrefix: 'debug.browser_errors',
    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(false)
      }).default();
    },
    init: function (server) {
      errorApi(server);
    }
  });
};
