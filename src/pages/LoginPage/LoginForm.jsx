import css from "./LoginForm.module.scss";
import Panel from "../../components/Panel";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import warningIcon from "../../assets/warningIcon.svg";

function LoginForm({ warning, handleChange, handleSubmit }) {
  const { username, password } = warning;

  return (
    <Panel className={css.LoginForm}>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className={css.formContainer}>
          <legend className={css.formTitle}>Log in</legend>
          {/* Username input */}
          <div className={css.inputContainer}>
            <label className={css.inputLabel} htmlFor="email">
              Email
            </label>
            <input
              required
              name="username"
              className={`${css.formInput} ${username && css.error}`}
              type="text"
              id="email"
              placeholder="Enter email..."
              onChange={handleChange}
            />
            {username && (
              <div className={css.errorContainer}>
                <img src={warningIcon} alt="" />
                <span className={css.errorMessage}>{username}</span>
              </div>
            )}
          </div>
          {/* Password input */}
          <div className={css.inputContainer}>
            <div className={css.forgotPassContainer}>
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className={css.link} tabIndex="-1">
                Forgot your password?
              </Link>
            </div>
            <input
              required
              name="password"
              className={`${css.formInput} ${password && css.error}`}
              type="password"
              id="password"
              placeholder="Enter password..."
              onChange={handleChange}
            />
            {password && (
              <div className={css.errorContainer}>
                <img src={warningIcon} alt="" />
                <span className={css.errorMessage}>{password}</span>
              </div>
            )}
          </div>
          {/* Submit button */}
          <input
            className={css.submitButton}
            type="submit"
            id="submit"
            value="Log in"
          />
        </fieldset>
      </form>

      <hr className={css.divider} />

      {/* Create account */}
      <div className={css.createAccContainer}>
        <p className={css.linkLabel}>Don&apos;t have an account yet?</p>
        <Link to="/signup" className={css.link}>
          Create an account
        </Link>
      </div>
    </Panel>
  );
}

LoginForm.propTypes = {
  emailRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  passwordRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  warning: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default LoginForm;
