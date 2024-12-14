# CardNexus Coding Challenge

## Overview

server/client with [tRPC] for ingesting and querying TCG data.

## How to start Project

### Requirements

- Node >= 18.0.0
- MongoDB

#### Install dependencies

```bash
npm install
```

#### Env Setup

- Set the `PORT` to 5000, The project runs on port 5000 by default. To change according to the preference, set it on `.env` and change the port of `dev:client` in `package.json`.
- Set the `MONGO_URI` to your own URI.

#### Run server/client

```bash
npm run dev
```

If all dependencies have been installed successfully, you will receive the message `yay!` on client side.
