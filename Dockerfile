FROM node:8

COPY ./ /app

WORKDIR /app

RUN npm install --unsafe-perm;

# Default Environment
ENV MESSENGER_ADAPTER_DSN amqp://guest:guest@messenger:5672

CMD ["./index.js"]
