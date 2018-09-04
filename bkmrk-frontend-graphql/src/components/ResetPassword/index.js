import React from 'react';
import PropTypes from 'prop-types';

import { emailRegex } from '../../helpers';

import Input from '../Input';
import Button from '../Button';

import Keydown from '../Keydown';

import FormWrapper from '../FormWrapper';
import Form from '../Form';
import FormElement from '../FormElement';
import Error from '../Error';
import Label from '../Label';

class ResetEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: null,
      passwordError: null,
      repeatPasswordError: null,
    };
    this.resetAction = this.resetAction.bind(this);
  }
  resetAction(e) {
    if (e) {
      e.preventDefault();
    }
    const email = this.email.value;
    const password = this.password.value;
    const repeatPassword = this.repeatPassword.value;
    let ok = true;
    if (email.length < 3) {
      ok = false;
      this.setState(() => {
        return { emailError: 'Email ist ein Pflichtfeld' };
      });
    } else if (!emailRegex.test(email)) {
      ok = false;
      this.setState(() => {
        return { emailError: 'Die Email erscheint falsch zu sein' };
      });
    } else {
      this.setState(() => {
        return { emailError: null };
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
    if (password !== repeatPassword) {
      ok = false;
      this.setState(() => {
        return {
          passwordError: 'Passwörter stimmen nicht überein.',
          repeatPasswordError: 'Passwörter stimmen nicht überein.',
        };
      });
    }

    if (ok) {
      // go for more
      this.props.sendData({
        email,
        password,
      });
    }
  }
  render() {
    const { emailError, passwordError, repeatPasswordError } = this.state;
    const { errorMessage } = this.props;
    let apiError = null;
    if (errorMessage === 'No user found') {
      apiError = 'Kein Nutzer unter dieser Email bekannt';
    }
    console.log(passwordError);
    const keycodes = new Set(['Enter', 'ctrl+g']);
    return (
      <Keydown keycodes={keycodes} handler={() => this.resetAction()}>
        <FormWrapper>
          <Form>
            <FormElement>
              <Label>Email Adresse</Label>
              <Input
                innerRef={(comp) => {
                  this.email = comp;
                }}
                type="email"
              />
              <Error errorMessage={emailError} />
              <Error errorMessage={apiError} />
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
            </FormElement>
            <FormElement>
              <Label>Passwort wiederholen</Label>
              <Input
                innerRef={(comp) => {
                  this.repeatPassword = comp;
                }}
                type="password"
              />
              <Error errorMessage={repeatPasswordError} />
            </FormElement>
            <Button onClick={e => this.resetAction(e)}>Passwort zurücksetzen</Button>
          </Form>
        </FormWrapper>
      </Keydown>
    );
  }
}

ResetEmail.propTypes = {
  sendData: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default ResetEmail;
