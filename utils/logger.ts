import pino from "pino";
import net from "net";

// const isDev = process.env.NODE_ENV !== "production"
//
const stream = net.createConnection({ host: "logstash", port: 5000 });

const logger = pino(
  // isDev
  //   ? {
  //       transport: {
  //         target: "pino-pretty",
  //         options: {
  //           colorize: true
  //         }
  //       }
  //     }
  //   :
  {},
  stream, // use default JSON logs in production
);

export default logger;
