<div id="top"></div>

<!-- ABOUT THE PROJECT -->

## About The Project

A trip booking Web APP

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Mongo](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [NodeJs](https://nodejs.org/en/)
- [Tailwind](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. SSH into your server
   ```sh
   ssh username@serveraddress
   ```
2. Clone the repo
   ```sh
   git clone https://github.com/allanzico/trip-booking.git
   ```
3. cd into the project and in each individual directory to Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env` file at the root of each directory and add your API keys (client/server/socket)

- Client API KEYS (React)
  ```js
  const REACT_APP_API_KEY = "ENTER YOUR API";
  ```
- Server API KEYS (NodeJs)
  ```js
  const API_KEY = "ENTER YOUR API";
  ```
- Socket API KEYS (Socket.io)
  ```js
  const API_KEY = "ENTER YOUR API";
  ```

<!-- SERVER CONFIGURATION -->

### Installing Nginx

```sh
apt install nginx
```

### Installing and configure Firewall

```sh
apt install ufw
```

```sh
ufw enable
```

```sh
ufw allow "Nginx Full"
```

### Delete the default server configuration

```sh
 rm /etc/nginx/sites-available/default
```

```sh
  rm /etc/nginx/sites-enabled/default
```

### Nginx configuration

```sh
   nano /etc/nginx/sites-available/yourFileName
```

```sh
   nano /etc/nginx/sites-available/yourFileName
```
#### Client config
```sh
server {
  listen 80;
  server_name kusimbula.com dev.kusimbula.com;

  location / {
      root /var/www/kusimbula/client;
      index  index.html index.htm;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      try_files $uri $uri/ /index.html;
  } 
}
```
#### API config
```sh
server {
  listen 80;
  server_name api.kusimbula.com;
  
  location / {
        proxy_pass http://159.65.199.240:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    } 
}
```
### copy config to sites enabled
```sh
ln -s /etc/nginx/sites-available/kusimbula /etc/nginx/sites-enabled/kusimbula
```
## Deploy React APP

## Deploy NodeJs App
