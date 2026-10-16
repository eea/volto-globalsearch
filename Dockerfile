# syntax=docker/dockerfile:1
# Add-on overlay onto eeacms/frontend-builder (Volto + Chromium base).
ARG VOLTO_VERSION
FROM eeacms/frontend-builder:${VOLTO_VERSION}

ARG ADDON_PATH

# Overlay the add-on onto the base; rm -rf /app/cypress so the add-on's EEA
# cypress replaces the base's upstream Volto one. The base image's
# node_modules was written by an older pnpm (old peer-context naming);
# installing over it with pnpm 10 can leave two React instances in the
# bundle, so start from a clean one.
COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/
RUN rm -rf /app/cypress /app/node_modules \
    && cp -r /app/src/addons/${ADDON_PATH}/. /app/ \
    && pnpm install \
    && make build-deps
