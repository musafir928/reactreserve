import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import catchErrors from "../utils/catchErrors";

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const isUser = Object.values(user).every(e => Boolean(e));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(p => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setErr("");
    } catch (err) {
      catchErrors(err, setErr);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Message
        attached
        icon='privacy'
        header='Welcome back!'
        content='Log in with email and password'
        color='blue'
      />
      <Form onSubmit={handleSubmit} error={Boolean(err)} loading={loading}>
        <Message error header='Oops!' content={err} />
        <Segment>
          <Form.Input
            fluid
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            value={user.password}
            onChange={handleChange}
          />
          <Button
            disabled={disabled || loading}
            icon='signup'
            type='submit'
            color='orange'
            content='Login'
          />
          {/* todo password confirmation and validation */}
        </Segment>
      </Form>
      <Message attached='bottom' warning>
        <Icon name='help' />
        New user?{"  "}
        <Link href='/signup'>
          <a>Sign up here</a>
        </Link>{" "}
        {"  "} instead
      </Message>
    </>
  );
}

export default Login;
