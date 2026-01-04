import pino from 'pino'

const isDev = process.env.NODE_ENV === 'development'

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: isDev
        ? {
              target: 'pino-pretty',
              options: {
                  colorize: true,
                  translateTime: 'yyyy-mm-dd HH:MM:ss',
                  ignore: 'pid,hostname',
              },
          }
        : undefined,
})

export default logger
