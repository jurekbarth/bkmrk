import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Content from '../Content';
import Input from '../Input';
import Button from '../Button';
import FormElement from '../FormElement';
import Label from '../Label';
import Error from '../Error';
import ArrowLeft from '../ArrowLeft';

class BookmarkDetail extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      // states 0: No state, 1: sending, 2: updated, 4: failure
      status: 0,
      firstNameError: null,
      lastNameError: null,
      newPasswordError: null,
      passwordError: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    // logic for resetting form
    this.setState(() => {
      return { status: nextProps.status };
    });
  }
  updateUser(e) {
    if (e) {
      e.preventDefault();
    }

    let ok = true;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const password = this.password.value;
    const newPassword = this.newPassword.value;
    const data = {};
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
    if (newPassword.length !== 0) {
      if (newPassword.length < 8) {
        ok = false;
        this.setState(() => {
          return { newPasswordError: 'Das neue Passwort muss mindestens 8 Zeichen haben' };
        });
      } else {
        this.setState(() => {
          return { newPasswordError: null };
        });
      }
      if (password.length === 0) {
        ok = false;
        this.setState(() => {
          return { passwordError: 'Bitte gib deine altes Passwort ein.' };
        });
      } else if (password.length < 8) {
        ok = false;
        this.setState(() => {
          return { passwordError: 'Das alte Passwort ist zu kurz, um richtig zu sein' };
        });
      } else {
        this.setState(() => {
          return { passwordError: null };
        });
      }
      data.password = password;
      data.newPassword = newPassword;
    }
    data.firstName = firstName;
    data.lastName = lastName;
    if (ok) {
      this.setState(() => {
        return { status: 1 };
      });
      this.props.updateUser(data);
    }
  }

  render() {
    const { history, data, error } = this.props;
    const { firstName, lastName } = data;
    const {
      status, firstNameError, lastNameError, passwordError, newPasswordError,
    } = this.state;
    let apiPasswordError = null;
    if (error === 'Wrong password') {
      apiPasswordError = 'Falsches Passwort';
    }
    return (
      <Content>
        <ButtonWrapper>
          <Backbutton onClick={() => history.goBack()}>
            <ArrowLeft />
            <span>Zurück zur Übersicht</span>
          </Backbutton>
        </ButtonWrapper>
        <FormWrapper>
          <FormElement>
            <Label>Vorname</Label>
            <Input
              innerRef={(comp) => {
                this.firstName = comp;
              }}
              type="text"
              defaultValue={firstName}
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
              defaultValue={lastName}
            />
            <Error errorMessage={lastNameError} />
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
          <FormElement>
            <Label>Neues Passwort</Label>
            <Input
              innerRef={(comp) => {
                this.newPassword = comp;
              }}
              type="password"
            />
            <Error errorMessage={newPasswordError} />
          </FormElement>
          <UpdateButtonWrapper>
            {status === 2 ? <Success>Gespeichert</Success> : null}
            <Button disabled={status === 1} onClick={() => this.updateUser()}>
              Speichern
            </Button>
          </UpdateButtonWrapper>
        </FormWrapper>
      </Content>
    );
  }
}

BookmarkDetail.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  error: PropTypes.string,
  updateUser: PropTypes.func,
  status: PropTypes.number,
};

const Success = styled.p`
  margin: 0 1em 0 0;
`;

const ButtonWrapper = styled.div`
  margin: 1em 0;
  padding-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
`;

const Backbutton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  align-items: center;
  padding: 0;
  cursor: pointer;
  color: var(--link-color);
  &:hover {
    color: var(--link-color-highlight);
  }
`;

const FormWrapper = styled.div`
  max-width: 66em;
  padding: 1em;
  box-shadow: var(--box-shadow);
  background-color: white;
  margin: 1em auto;
  position: relative;
`;

const UpdateButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default BookmarkDetail;
