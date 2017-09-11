import { browserErrors } from './plugins/browser_errors';
import { heapDump } from './plugins/heap_dump';

export default function (kibana) {
  return [
    browserErrors(kibana),
    heapDump(kibana)
  ];
}
