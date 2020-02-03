// eslint-disable-next-line
const _Joi = require("@hapi/joi");
const JoiPhoneNumber = require("joi-phone-number");

const Joi = _Joi.extend(JoiPhoneNumber);

const defaultRefs = require("./refs/default");

const fields = {
  id: Joi.string().description("Id of the user"),
  account_id: Joi.string().description("Id of the account of the user"),
  user_id: Joi.string().description("Id of the the user"),
  first_name: Joi.string().description("First name of the user"),
  last_name: Joi.string().description("Last name of the user"),
  email: Joi.string().description("Email address of the user"),
  phone_number: Joi.string().description("Phone number of the user"),
  password: Joi.string().description("Password of the user"),
  is_verified: Joi.boolean().description("Account is verified true/false"),
  is_admin: Joi.boolean().description("Account is admin true/false"),
  access_token: Joi.string().description("Access token")
};

const refs = {
  light_infos_user: Joi.object({
    id: fields.id,
    account_id: fields.account_id,
    user_id: fields.user_id,
    phone_number: fields.phone_number,
    email: fields.email,
    first_name: fields.first_name,
    last_name: fields.last_name,
    is_verified: fields.is_verified,
    is_admin: fields.is_admin
  }).label("light_infos_user"),
  infos_user: Joi.object({
    first_name: fields.first_name,
    last_name: fields.last_name,
    email: fields.email.email(),
    password: fields.password,
    phone_number: fields.phone_number.phoneNumber({ format: "e164" })
  })
    .required()
    .label("infos_user"),
  infos_user_is_required: Joi.object({
    first_name: fields.first_name.required(),
    last_name: fields.last_name.required(),
    email: fields.email.email().required(),
    password: fields.password.required(),
    phone_number: fields.phone_number.phoneNumber({ format: "e164" }).required()
  })
    .required()
    .label("infos_user_is_required")
};

const models = () => ({
  "POST/users/create": {
    body: refs.infos_user_is_required,
    response: defaultRefs.status.description(
      "Create a new user with a simple right"
    )
  },
  "GET/users/list": {
    queries: defaultRefs.token,
    response: Joi.object({
      list: Joi.array()
        .items(refs.light_infos_user)
        .required()
    })
      .required()
      .description("Retrieve a list of users")
  },
  "POST/users/login": {
    body: Joi.object({
      email: fields.email.email().required(),
      password: fields.password.required()
    }),
    response: Joi.object({
      access_token: fields.access_token.required()
    })
      .required()
      .description("Process to a log in request")
  },
  "GET/users/:user_id": {
    queries: defaultRefs.token,
    response: Joi.object({
      user: refs.light_infos_user.default(null)
    })
      .required()
      .description("Retrieve an user")
  },
  "PUT/users/:user_id": {
    queries: defaultRefs.token,
    body: refs.infos_user,
    response: defaultRefs.status.description(`Update the user's information`)
  },
  "DELETE/users/:user_id": {
    queries: defaultRefs.token,
    response: defaultRefs.status.description("Delete an user")
  }
});

module.exports = models;
