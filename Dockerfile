FROM nginx:alpine

ARG oddox_version=0.1.0
ARG vcs_ref=unspecified
ARG build_date=unspecified

LABEL org.label-schema.name="oddox-dashboard" \
      org.label-schema.description="open source blog with an offline-first writer" \
      org.label-schema.build-date="${build_date}" \
      org.label-schema.vcs-url="https://github.com/amdelamar/oddox-dashboard" \
      org.label-schema.vcs-ref="${vcs_ref}" \
      org.label-schema.version="${oddox_version}" \
      org.label-schema.schema-version="1.0" \
      maintainer="amdelamar"

# App config
ENV ODDOX_VERSION=$oddox_version \
    ODDOX_HOME="/opt/oddox" \
    PORT="8080"

# Non-root user
RUN groupadd -r oddox && useradd -r -g oddox oddox
USER oddox

#COPY --chown=oddox:oddox nginx.conf /etc/nginx/nginx.conf
COPY --chown=oddox:oddox docs /usr/share/nginx/html

EXPOSE 8080
