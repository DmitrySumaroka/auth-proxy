# Authenitcating Proxy

[![Build Status](https://travis-ci.org/tizzo/auth-proxy.png?branch=master)](https://travis-ci.org/tizzo/auth-proxy)
[![Coverage Status](https://coveralls.io/repos/tizzo/auth-proxy/badge.png)](https://coveralls.io/r/tizzo/auth-proxy)

**STATUS - This project is under active development and while it is currently functional it is not yet stable or properly documented, I'll keep the README up to date as this project takes shape.**

This module is a little bit of glue wrapping [express](http://expressjs.com/), [passport](http://passportjs.org/), and [HTTP Proxy](https://github.com/nodejitsu/node-http-proxy).  It allows you to setup a simple reverse proxy server to provide authentication for otherwise unsecured services in your infrastructure. It currently ships with authentication using google apps oauth2. You must add apps domains and allowed users to a whitelist before anyone can authenticate, you'll also need to define your proxy routes.

Patches adding support for other authentication strategies are most welcome.

## Installation

1. Clone the repo
2. `cd` into the directory and run `npm install`
3. Create a config.yaml in the root of the repository, any configuration added to this yaml file will override the defaults (set in `default.config.yaml`)
4. Setup your domain and email white lists and add your google apps credentials to the config.yaml file.
5. Setup your routes in config.yaml (see the documentation and examples below).
6. Start the server with `npm start`

### Configuring

The `default.config.yaml` file holds the default configuration used by the proxy. If a `config.yaml` file is created in the root of the repository then any keys set will override defaults set in the default configuration file. Environment variables will override anything set in the configuration files. Environment variables can be set for any configuration key but are converted (all capital letters with underscores rather than camel case.

### Defining Routes

The routes configuration key is an array of route objects. This list of routes is searched (in the order they are defined) when any incomming request is received in the proxy. A path and/or a hostname are checked (if configured - both optional) and the first matching route is used. For a small performance gain the most commonly used routes should probably be at the beginning of the list.

#### Required configuration keys

- `name` A name for the route
- `description` A description for the route.
- `host` The host to proxy matching requests to.
- `port` The port at `host` to route the requests to.
- `link` This is used on the home page to link to this resource. This can be relative if paths are used to match or absolute for hosts.

#### Optional configuration keys

- `pathPattern` A regex of the path to match, usually this should start with a `^/` (to match only instances at the beginning of the path and end with `/?` to optionally allow a trailing slash.
- `hostPattern` A regex to search for host to match for incomming routes. This allows you to route to different applications based on host name.
- `pathRewritePattern` This rewrites the request path sent to the backend used for this route. This may use regex matches from the `pathPattern` setting in normal javascript `replace()` syntax.
- `hostRewritePattern` This rewrite the request host sent in the headers to the backend for this route. Like `pathRewritePattern` this may use tokens from the `hostPattern` regex as per the normal javascript `replace()` syntax.
- `basicAuth` An object with attributes of `name` and `password`. This will be added as http basic auth for all requests proxied through this route.

#### Configuration example

```yaml
routes:
  - name: "Jenkins"
    description: "An extendable open source continuous integration server."
    host: localhost
    port: 8080
    pathPattern: "^/jenkins/?"
    link: /jenkins
  - name: "Jenkins Git Calback"
    description: A brutal task master
    pathRewritePattern: /
    host: localhost
    port: 8080
    pathPattern: "^/jenkins/?"
  - name: test route
    pathPattern: "/test/?"
    description: debug info
    pathRewritePattern: "/"
    host: localhost
    hostPattern: 127.0.0.1
    link: test
    hostRewritePattern: fooozbazzzz
    port: 8989
```

