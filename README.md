![example workflow](https://github.com/cederstrom/e2e-workshop/actions/workflows/ci.yml/badge.svg)

# end-2-end tests with Cypress

This repo is the base for a hands on lab in end-2-end testing with Cypress.

In the lab we will be using Cypress for writing UI-tests for a super "raw" time reporting application written in typescript.

## 0. What you need to do _before_ the lab

You need to install Node.js and Cypress (which will bring some dependencies as well).
You find instructions below.

If you are having any trouble with this README before the lab session, feel free to contact [Andreas Cederström on Twitter](https://twitter.com/a_cederstrom) :)

### 0.1. Install Node.js

To be able to run this lab you need to have Node.js installed.
If you do not already have it you can [download it here](https://nodejs.org/en/download/).
Get the LTS version if you are not sure on which one to pick.

Once installed you shall be able to start a terminal and execute the following:

```console
node --version
```

it should produce a version number. E.g. `v14.15.4` for the current LTS.
We have tested for example with `v12.14.1` and it worked just fine as well.

### 0.2. Get the source code

The best way to get the source code is to `git clone` this repo.

Alternatively, if you do not want to `git clone` it you can choose to download the repo as a ZIP file instead.

### 0.3. Install dependencies

Since we will be using Node.js you can install the dependencies with npm.

Change directory to the repo you just cloned.
Then install dependencies with npm:

```console
npm install
```

## 1. Check that it works

### 1.1. Unit tests

To run the unit tests you can execute the following in a terminal:

```console
npm run test
```

### 1.2. Serve the lab application

You can start the application from terminal with:

```console
npm run serve
```

After it has been started you can see the app running on http://localhost:3000

### 1.4. Run Cypress tests

The Cypress tests will use a separate running instance of the application to be isolated from your manual testing.
This separate instance is launched automatically when you start Cypress with one of the following commands.

Run them headless with

```console
npm run cypress
```

or in Cypress UI Test Runner with

```console
npm run cypress:open
```

Now you are very well prepared for the lab! Welcome!!! :)

## About the folder structure

```
├─ src
│  ├─ anti-corruption-layer  # Anti-corruption layer towards other subsystems
│  ├─ api-controllers        # HTTP controllers to serve API
│  ├─ domain-model           # Domain model and infrastructure interfaces
│  ├─ env-config             # Config for each environment (development, test, e2e)
│  ├─ infrastructure         # Repositories
│  └─ public                 # Public static files for the web app
└─ test
   ├─ e2e                    # e2e (Cypress) tests
   └─ unit                   # Unit tests
```

## About the HTTP backend

There are a couple of endpoints implemented in the lab app.
They are listed below and you can find example of their usage in `src/public/scripts/index.js`.

The endpoints are defined in `src/Server.ts` and then routed to each controller.

### Available endpoints

Get all days in storage

```
GET  /api/days
```

Add registration to day for consultant

```
POST /api/days/{consultantId: Guid}/{date: yyyy-MM-dd}/registrations
```

Get all consultants

```
GET  /api/consultants
```

Get projects for consultant

```
GET  /api/consultants/{consultantId: Guid}/projects
```
