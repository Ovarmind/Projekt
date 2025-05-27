import { RequestHandler } from 'express';

export const logRequest: RequestHandler = (request, response, next) => {
    console.log(`[${request.method}] ${request.url} - ${new Date().toISOString()}`);
    next();
};