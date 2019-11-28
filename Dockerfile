FROM vamsiramakrishnan/ora-se-symposium-backend-2019:3.0
MAINTAINER vamsi.ramakrishnan@oracle.com
RUN rm -rf *
WORKDIR ora-se-symposium-backend
COPY . .
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "start"]
