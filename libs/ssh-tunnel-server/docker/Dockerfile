FROM nginx:latest

RUN apt-get update && \
    apt-get install -y jq ssh

COPY nginx.conf.tpl /etc/nginx/nginx.conf
COPY scripts /scripts

ENTRYPOINT ["/scripts/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]