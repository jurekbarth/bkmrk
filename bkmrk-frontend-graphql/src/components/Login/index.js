import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from '../Input';
import Button from '../Button';

import Keydown from '../Keydown';

import FormWrapper from '../FormWrapper';
import Form from '../Form';
import Link from '../Link';
import FormElement from '../FormElement';
import Error from '../Error';
import Label from '../Label';

// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameError: null,
      passwordError: null,
    };
    this.loginAction = this.loginAction.bind(this);
  }
  loginAction(e) {
    if (e) {
      e.preventDefault();
    }
    let { username, password } = this;
    username = username.value;
    password = password.value;
    let ok = true;
    if (username.length < 3) {
      ok = false;
      this.setState(() => {
        return { usernameError: 'Username ist ein Pflichtfeld' };
      });
    } else if (!emailRegex.test(username)) {
      ok = false;
      this.setState(() => {
        return { usernameError: 'Die Email erscheint falsch zu sein' };
      });
    } else {
      this.setState(() => {
        return { usernameError: null };
      });
    }
    if (password.length < 8) {
      ok = false;
      this.setState(() => {
        return { passwordError: 'Das Passwort muss mindestens 8 Zeichen haben' };
      });
    } else {
      this.setState(() => {
        return { passwordError: null };
      });
    }
    if (ok) {
      // go for more
      this.props.sendData({
        username,
        password,
      });
    }
  }
  render() {
    const { usernameError, passwordError } = this.state;
    const { errorMessage } = this.props;
    let apiUsernameError = null;
    let apiPasswordError = null;
    if (errorMessage === 'Unknown username') {
      apiUsernameError = 'Kein Nutzer unter dieser Email bekannt';
    }
    if (errorMessage === 'Wrong password') {
      apiPasswordError = 'Dein Passwort ist falsch';
    }
    const keycodes = new Set(['Enter', 'ctrl+g']);
    return (
      <Keydown keycodes={keycodes} handler={() => this.loginAction()}>
        <FormWrapper>
          <Form>
            <FormElement>
              <Label>Email Adresse</Label>
              <Input
                innerRef={(comp) => {
                  this.username = comp;
                }}
                type="email"
              />
              <Error errorMessage={usernameError} />
              <Error errorMessage={apiUsernameError} />
            </FormElement>
            <FormElement>
              <Label>Passwort</Label>
              <Input
                innerRef={(comp) => {
                  this.password = comp;
                }}
                type="password"
              />
              <Error errorMessage={passwordError} />
              <Error errorMessage={apiPasswordError} />
            </FormElement>
            <Button onClick={e => this.loginAction(e)}>Login</Button>
          </Form>
          <LinkWrapper>
            <Link to="/resetPassword">Passwort vergessen</Link>
          </LinkWrapper>
        </FormWrapper>
      </Keydown>
    );
  }
}

const LinkWrapper = styled.div`
  margin-top: 1em;
`;

Login.propTypes = {
  sendData: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default Login;
