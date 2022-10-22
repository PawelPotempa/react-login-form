import css from "./index.module.scss";
import DefaultLayout from "../../layouts/DefaultLayout";
import LoginForm from "./LoginForm";
import useAxios from "../../api/useAxios";
import useDatastore from "../../datastore/useDatastore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LoginPage() {
  const axios = useAxios();
  const { setAccessToken, setUser, addMessage, removeMessage } = useDatastore();
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [warning, setWarning] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Add flash message whenever error changes
  useEffect(() => {
    addMessage("error", error);
  }, [error]);

  // Attempt to login with provided credentials
  function onLoginAttempt(username, password) {
    axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setAccessToken(response.data.token);
          setUser(response.data.user);
          removeMessage("error", error);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setWarning({
              username: "Incorrect username or password",
              password: "Incorrect username or password",
            });
          } else {
            setError("Server is offline, try again later");
          }
        } else if (error.request) {
          setError("Access denied, try again later");
          console.clear();
        } else {
          setError("Something went wrong, try again later");
        }
        // Make sure we don't expose the serverl url to the client
        console.clear();
      });
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = values;

    // Check if BOTH username and password are invalid, if yes then display warning
    if (username.length === 0 && password.length === 0) {
      setWarning({
        username: "Username is required",
        password: "Password is required",
      });
      return;
    }

    // Check if ONLY username is invalid, if yes then display warning
    if (username.length === 0) {
      setWarning({
        username: "Username is required",
        password: "",
      });
      return;
    }

    // Check if ONLY password is invalid, if yes then display warning
    if (password.length === 0) {
      setWarning({
        username: "",
        password: "Password is required",
      });
      return;
    }

    // If both username and password are valid, then attempt to login
    onLoginAttempt(username, password);
  };

  // Handle input change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <DefaultLayout>
      <div className={css.alignmentWrapper}>
        <LoginForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          warning={warning}
        />
      </div>
    </DefaultLayout>
  );
}

export default LoginPage;
