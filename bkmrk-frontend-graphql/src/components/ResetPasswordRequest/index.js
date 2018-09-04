import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { emailRegex } from '../../helpers';

import Input from '../Input';
import Button from '../Button';

import Keydown from '../Keydown';

import FormWrapper from '../FormWrapper';
import Form from '../Form';
import Link from '../Link';
import FormElement from '../FormElement';
import Error from '../Error';
import Label from '../Label';

class ResetPasswordRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: null,
    };
    this.resetAction = this.resetAction.bind(this);
  }
  resetAction(e) {
    if (e) {
      e.preventDefault();
    }
    const email = this.email.value;
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
    if (ok) {
      // go for more
      this.props.sendData({
        email,
      });
    }
  }
  render() {
    const { emailError } = this.state;
    const { errorMessage } = this.props;
    let apiEmailError = null;
    if (errorMessage === 'No user found') {
      apiEmailError = 'Kein Nutzer unter dieser Email bekannt';
    }
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
              <Error errorMessage={apiEmailError} />
            </FormElement>
            <Button onClick={e => this.resetAction(e)}>Passwort zurücksetzen</Button>
          </Form>
          <LinkWrapper>
            <Link to="/login">Login</Link>
          </LinkWrapper>
        </FormWrapper>
      </Keydown>
    );
  }
}

const LinkWrapper = styled.div`
  margin-top: 1em;
`;

ResetPasswordRequest.propTypes = {
  sendData: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default ResetPasswordRequest;
