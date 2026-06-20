import styles from "./ErrorMessage.module.css";

/**
 * TODO: implement ErrorMessage as described in README.md → "Components":
 *  - Accepts a `message` prop.
 *  - Renders a `<p className={styles.errorMessage}>{message}</p>` only when `message` is present.
 *  - Renders nothing (null) when there is no message.
 */
const ErrorMessage = ({ message }) => {
  if(!message) return null;
  return <p className={styles.errorMessage}>{message}</p>;
};

export default ErrorMessage;


