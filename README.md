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

#### Ingest Data

```bash
npm run ingest
```

It ingests the TCG data and uploads on mongodb, it creates the `cards` table.

## Commands

```bash
npm install             # install dependencies
npm run ingest          # ingest TCG data and insert on mongodb
npm run dev:server      # start server
npm run dev:client      # start client
npm run dev             # start server/client
```
