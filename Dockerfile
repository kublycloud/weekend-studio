FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
COPY scripts/build.mjs ./scripts/build.mjs
COPY index.html style.css app.js favicon.svg ./
RUN npm run build

FROM nginx:stable-alpine AS runtime
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
