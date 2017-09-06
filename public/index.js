import { uiModules } from 'ui/modules';
import { noop } from 'lodash';

uiModules.get('errorHandler', [])
.run(($http, $window) => {
  $window.addEventListener('error', event => {
    $http.post('/api/error', {
      message: event.message,
      source: event.filename,
      error: event.error.stack,
      column: event.colno,
      line: event.lineno
    })
    .then(() => noop)
    .catch(() => noop);
  });
});
