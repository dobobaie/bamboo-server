module.exports = {
  request_timeout: "clientTimeout",
  invalid_authorization: "unauthorized",
  invalid_token: "unauthorized",
  missing_authorization_token: "unauthorized",
  invalid_authorization_token: "unauthorized",

  validation_error_first_name_is_required: "badData",
  validation_error_last_name_is_required: "badData",
  validation_error_password_is_required: "badData",
  validation_error_email_is_required: "badData",
  validation_error_phone_number_is_required: "badData",
  validation_error_name_is_required: "badData",

  validation_error_first_name_is_not_allowed_to_be_empty: "badData",
  validation_error_last_name_is_not_allowed_to_be_empty: "badData",
  validation_error_password_is_not_allowed_to_be_empty: "badData",
  validation_error_email_is_not_allowed_to_be_empty: "badData",
  validation_error_phone_number_is_not_allowed_to_be_empty: "badData",

  validation_error_email_must_be_a_valid_email: "badData",
  validation_error_phone_number_did_not_seem_to_be_a_phone_number: "badData",
  validation_error_estimated_price_must_be_a_number: "badData",

  user_email_or_phone_number_already_exists: "badData",
  user_does_not_exist: "badData",

  invalid_delation_contract_attached_to_product_id: "badData",
  product_id_have_already_a_contract: "badData"
};
