import jwt from 'jsonwebtoken';

    export default defineEventHandler(async (event) => {
      if (event.node.req.headers.authentication) {
        event.context.auth = { id: await jwt.verify(event.node.req.headers.authentication, 'mysecrettoken').id };
      }
    });