import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import Title from "../components/Title";
import ListFormErros from "../components/ListFormErrors";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../graphql";

const Login = (props) => {
  const [error, setError] = useState({});
  const { login } = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Title label="Login" />
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={error.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={error.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      <ListFormErros error={error} />
    </div>
  );
};

export default Login;
