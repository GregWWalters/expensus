### Dev Environment Setup

## Local Server

App expects to be served from behind an nginx server, so will not handle https itself. If you have an existing nginx config, then adding the below should help. Set the ports to whatever you need and note the certs in use, adjust those to your own self-signed certs if necessary.

```
# redirect on any https
  server {
    listen 80;
    listen [::]:80;
    server_name .atreidesdev.dev

    return 301 https://$server_name$request_uri;
  }

  upstream expensus_api {
    server 127.0.0.1:8130;
  }

  server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name expensus.atreidesdev.dev

    ssl on;
    ssl_certificate /usr/local/etc/nginx/ssl/atreidesdev-wildcard.pem;
    ssl_certificate_key /usr/local/etc/nginx/ssl/atreidesdev-wildcard.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    location /api/ {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_ssl_session_reuse off;
      proxy_set_header Host $http_host;
      proxy_cache_bypass $http_upgrade;
      proxy_redirect off;
      proxy_pass http://expensus_api/;
    }

    location / {
      gzip on;
      gzip_comp_level 9;
      gzip_types text/plain application/x-javascript text/css;
      root /...your...file...path...to...expensus/public;
      try_files $uri /index.html;
    }
  }
```

_Note: _ you may also want to add `expensus.atreidesdev.dev` to your hosts file
