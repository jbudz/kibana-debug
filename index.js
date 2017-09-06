import { errorApi } from './server';
import mappings from './mappings.json';

export default (kibana) => {
  return new kibana.Plugin({
    uiExports: {
      hacks: [
        'plugins/error/index'
      ],
      mappings
    },
    init: function (server) {
      errorApi(server);
    }
  });
};
