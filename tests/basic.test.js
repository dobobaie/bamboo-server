const test = require("ava");
const request = require("ava-http");

const { app, modules } = require("../index");

const SERVER_URL = `http://${app.config.server_ip}:${app.config.server_port}`;

test("Server initialization", t =>
  new Promise(resolve =>
    modules.server.listen(app.config.server_port, () => resolve())
  )
    .then(m => t.pass(m))
    .catch(m => t.fail(m)));

test("[Request] - I'm an user and I want to watch the default route", t =>
  request
    .get(`${SERVER_URL}/`)
    .then(r =>
      t.deepEqual(
        r,
        {
          message: `Welcome to ${app.packageJSON.name} ${app.packageJSON.version}`
        },
        "return a wrong response"
      )
    )
    .catch(r => t.fail(r)));

test("[Request] - I'm an user and I want to know if the service is working", t =>
  request
    .get(`${SERVER_URL}/health`)
    .then(r => t.deepEqual(r, { status: "OK" }, "return a wrong response"))
    .catch(r => t.fail(r)));

test("[Request] - I'm an user without token and I want to retrieve all users", t =>
  request
    .get(`${SERVER_URL}/users/list`)
    .then(() => t.fail("request is not supposed to work"))
    .catch(r =>
      t.deepEqual(
        r.error,
        {
          errors: [{ code: "invalid_authorization" }]
        },
        "return a wrong error"
      )
    ));
