import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import Title from "../components/Title";
import ListFormErros from "../components/ListFormErrors";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../graphql";

const Register = (props) => {
  const [error, setError] = useState({});
  const { login } = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Title label="Register" />
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
          label="Email"
          placeholder="Email..."
          name="email"
          type="text"
          value={values.email}
          error={error.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={error.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      <ListFormErros error={error} />
    </div>
  );
};

export default Register;
