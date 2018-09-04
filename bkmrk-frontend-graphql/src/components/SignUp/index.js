import React from 'react';
import PropTypes from 'prop-types';

import { emailRegex } from '../../helpers';

import Input from '../Input';
import Button from '../Button';
import Label from '../Label';
import Error from '../Error';
import FormElement from '../FormElement';
import FormWrapper from '../FormWrapper';
import Form from '../Form';

import Keydown from '../Keydown';

Error.propTypes = {
  errorMessage: PropTypes.string,
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,
    };
    this.registerAction = this.registerAction.bind(this);
  }
  registerAction(e) {
    if (e) {
      e.preventDefault();
    }
    let {
      firstName, lastName, email, password,
    } = this;
    firstName = firstName.value;
    lastName = lastName.value;
    email = email.value;
    password = password.value;
    let ok = true;
    if (firstName.length < 1) {
      ok = false;
      this.setState(() => {
        return { firstNameError: 'Vorname ist ein Pflichtfeld' };
      });
    } else {
      this.setState(() => {
        return { firstNameError: null };
      });
    }
    if (lastName.length < 1) {
      ok = false;
      this.setState(() => {
        return { lastNameError: 'Nachname ist ein Pflichtfeld' };
      });
    } else {
      this.setState(() => {
        return { lastNameError: null };
      });
    }
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
    if (ok) {
      // go for more
      this.props.sendData({
        firstName,
        lastName,
        email,
        password,
      });
    }
  }
  render() {
    const {
      firstNameError, lastNameError, emailError, passwordError,
    } = this.state;
    const { errorMessage } = this.props;
    let existingEmail = null;
    if (errorMessage === 'email') {
      existingEmail = 'Mit dieser Email hat sich bereits ein Nutzer registriert.';
    }
    const keycodes = new Set(['Enter', 'ctrl+g']);
    return (
      <Keydown keycodes={keycodes} handler={() => this.registerAction()}>
        <FormWrapper>
          <Form>
            <FormElement>
              <Label>Vorname</Label>
              <Input
                innerRef={(comp) => {
                  this.firstName = comp;
                }}
                type="text"
                placeholder="Max"
              />
              <Error errorMessage={firstNameError} />
            </FormElement>
            <FormElement>
              <Label>Nachname</Label>
              <Input
                innerRef={(comp) => {
                  this.lastName = comp;
                }}
                type="text"
                placeholder="Mustermann"
              />
              <Error errorMessage={lastNameError} />
            </FormElement>
            <FormElement>
              <Label>Email Adresse</Label>
              <Input
                innerRef={(comp) => {
                  this.email = comp;
                }}
                type="email"
                placeholder="max@muster.de"
              />
              <Error errorMessage={emailError} />
              <Error errorMessage={existingEmail} />
            </FormElement>
            <FormElement>
              <Label>Passwort (min. 8 Zeichen)</Label>
              <Input
                innerRef={(comp) => {
                  this.password = comp;
                }}
                type="password"
              />
              <Error errorMessage={passwordError} />
            </FormElement>
            <Button onClick={e => this.registerAction(e)}>Registrieren</Button>
          </Form>
        </FormWrapper>
      </Keydown>
    );
  }
}

SignUp.propTypes = {
  sendData: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default SignUp;
