import Joi from 'joi';
import { indexError } from './lib/index_error';

export function errorApi(server) {
  const config = server.config();
  const index = config.get('kibana.index');
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('admin');

  server.route({
    path: '/api/error',
    method: ['POST'],
    config: {
      validate: {
        payload: Joi.object().keys({
          message: Joi.string().required(),
          error: Joi.string().required(),
          source: Joi.string().required(),
          line: Joi.number().required(),
          column: Joi.number().required()
        })
      },
      tags: ['api'],
    },

    handler: (req, reply) => {
      reply(200);

      const error = req.payload;
      indexError(callWithRequest, req, {
        index,
        type: 'doc'
      })
      .then(response => {
        const { _index: index, _type: type, _id: id } = response;
        server.log(['debug'], `Indexed browser error at ${index}/${type}/${id}`);
      })
      .catch(e => {
        server.log(['error'], `Problem indexing browser error ${JSON.stringify(error)}`);
        server.log(['error'], e);
      });
    }
  });
}
