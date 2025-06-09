#!/bin/bash

pm2 stop freelance
cd /opt/neil-freelance/
git pull
prisma migrate dev --name "$(git log -1 --pretty=%B)" || exit 1
npm run build || exit 1
pm2 start freelance
