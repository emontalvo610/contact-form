FROM node:18-alpine AS base

FROM base AS dependencies
ARG GITHUB_TOKEN
ARG FONT_AWESOME_TOKEN
ARG ARG PQINA_TOKEN

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

RUN npm config set "@pickleballinc:registry" https://npm.pkg.github.com
RUN npm config set "//npm.pkg.github.com/:_authToken" ${GITHUB_TOKEN}

RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" ${FONT_AWESOME_TOKEN}

RUN npm config set "@pqina:registry" https://npm.pqina.nl/
RUN npm config set "//npm.pqina.nl/:_authToken" ${PQINA_TOKEN}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder image, build the application by running npm run build
FROM base as builder
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
ARG RECAPTCHA_SECRET_KEY
ENV RECAPTCHA_SECRET_KEY=${RECAPTCHA_SECRET_KEY}
ARG API_URL 
ENV API_URL=${API_URL}
ARG COOKIE_DOMAIN
ENV COOKIE_DOMAIN=${COOKIE_DOMAIN}
ARG API_KEY 
ENV API_KEY=${API_KEY}
ARG COOKIE_SECRET
ENV COOKIE_SECRET=${COOKIE_SECRET}

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run node server.js
FROM base AS runner
WORKDIR /app

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
ARG RECAPTCHA_SECRET_KEY
ENV RECAPTCHA_SECRET_KEY=${RECAPTCHA_SECRET_KEY}
ARG API_URL 
ENV API_URL=${API_URL}
ARG COOKIE_DOMAIN
ENV COOKIE_DOMAIN=${COOKIE_DOMAIN}
ARG API_KEY 
ENV API_KEY=${API_KEY}
ARG COOKIE_SECRET
ENV COOKIE_SECRET=${COOKIE_SECRET}

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# expose port and set user
USER nextjs
EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]