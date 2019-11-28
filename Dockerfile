FROM oraclelinux:7-slim

RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
     yum-config-manager --disable ol7_developer_EPEL && \
     yum -y install oracle-instantclient19.3-basiclite nodejs && \
     yum -y install unzip && \
     rm -rf /var/cache/yum

COPY sesympwallet.zip /
RUN unzip sesympwallet.zip -d /usr/lib/oracle/19.3/client64/lib/network/admin/
RUN mkdir ora-se-symposium-backend
WORKDIR ora-se-symposium-backend
COPY . .
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "start"]
