import heapdump from 'heapdump';
import { join } from 'path';

export const heapDump =  (kibana) => {
  return new kibana.Plugin({
    id: 'heap_dump',
    configPrefix: 'debug.heap_dump',
    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(false),
        interval_in_minutes: Joi.number().default(60 *  24)
      }).default();
    },
    init: function (server) {
      const config = server.config();
      const dataPath = config.get('path.data');
      const intervalInMilliseconds = config.get('debug.heap_dump.interval_in_minutes') * 1000 * 60;
      function dump() {
        server.log(['info'], 'Taking heap snapshot, this is a blocking operation and may cause the server to freeze');
        const heapPath = join(dataPath, `${Date.now()}.heapsnapshot`);
        heapdump.writeSnapshot(heapPath);
        server.log(['info'], `Heap saved at ${heapPath}`);
      }
      setInterval(dump, intervalInMilliseconds);
      dump();
    }
  });
};
