!#/bin/bash

pm2 stop freelance
prisma migrate production || exit 1
npm run build || exit 1
pm2 start freelance
