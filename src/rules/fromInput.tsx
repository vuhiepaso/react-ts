import { Rule, RuleObject } from "antd/es/form";
const REGEX_PASSWORD =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง~\[\]\|\\?\/])/;

const required = (label: string): RuleObject => ({
  required: true,
  message: `Please input your ${label} !`,
});

const min = (min: number): RuleObject => ({
  min: min,
  message: `This is must be at least ${min} characters`,
});
const max = (max: number): RuleObject => ({
  max: max,
  message: `This is cannot be longer than ${max} characters`,
});

const email: RuleObject = {
  type: "email",
  message: "This is not a valid email",
};

const customPassword: RuleObject = {
  pattern: REGEX_PASSWORD,
  message:
    "This is including at least 1 lowercase letter, 1 uppercase letter, and 1 special character.",
};

const confirmPassword: Rule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("The two passwords that you entered do not match!")
    );
  },
});

export { required, min, max, email, customPassword, confirmPassword };
