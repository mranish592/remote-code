FROM --platform=linux/amd64 node:slim
RUN mkdir /remote-code-backend
COPY . /remote-code-backend/
WORKDIR /remote-code-backend

RUN apt update && apt install -y \
    procps \
    curl \
    time

RUN rm -rf node_modules
RUN npm install
RUN chmod +x scripts/* 

EXPOSE 80
EXPOSE 3000
EXPOSE 3001
# ENTRYPOINT ["tail", "-f", "/dev/null"]
ENTRYPOINT ["scripts/entrypoint.sh"]
