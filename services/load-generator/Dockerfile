FROM alpine:latest

RUN apk add --no-cache curl bash

COPY test-script.sh /test-script.sh
RUN chmod +x /test-script.sh

CMD ["/test-script.sh"]