import styles from "./ErrorMessage.module.css";

/**
 * TODO: implement ErrorMessage as described in README.md → "Components":
 *  - Accepts a `message` prop.
 *  - Renders a `<p className={styles.errorMessage}>{message}</p>` only when `message` is present.
 *  - Renders nothing (null) when there is no message.
 */
const ErrorMessage = ({ message }) => {
  return message ? <p className={styles.errorMessage}>{message}</p> : null;
};

export default ErrorMessage;


