import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormElement from '../FormElement';
import Label from '../Label';
import Input from '../Input';
import Error from '../Error';
import Button from '../Button';
import SmallButton from '../ButtonSmall';
import CloseIcon from '../CloseIcon';

import { makeId, urlRegex } from '../../helpers';

class LinkAdd extends React.Component {
  constructor(props) {
    super(props);
    this.addAction = this.addAction.bind(this);
    this.state = {
      tags: [''],
      urlError: null,
      url: null,
      redirectSuccess: false,
    };
  }
  componentWillReceiveProps({ url }) {
    // logic for resetting form
    const stateUrl = this.state.url;
    if (url !== null && url === stateUrl) {
      this.setState(() => {
        return {
          tags: [''],
          redirectSuccess: true,
        };
      });
      this.url.value = '';
    }
  }
  addAction(e) {
    if (e) {
      e.preventDefault();
    }
    const tagCount = this.state.tags.length;
    const allTags = [];
    for (let i = 0; i < tagCount; i += 1) {
      allTags.push(this[`tag.${i}`].value);
    }
    this.setState(() => {
      return { tags: allTags };
    });
    const url = this.url.value;
    const filteredTags = allTags.filter(tag => tag.length >= 1 && tag.length < 40);
    let ok = true;
    if (!urlRegex.test(url)) {
      ok = false;
      this.setState(() => {
        return { urlError: 'Url hat nicht das richtige Format.' };
      });
    } else {
      this.setState(() => {
        return { urlError: null, url };
      });
    }
    const tags = filteredTags.map(tag => ({
      title: tag,
    }));
    const data = {
      url,
      tags,
    };
    if (ok) {
      this.props.sendData(data);
    }
  }
  addTag() {
    this.setState((prevState) => {
      const prevTags = prevState.tags;
      const tags = [];
      for (let i = 0; i < prevTags.length; i += 1) {
        tags.push(this[`tag.${i}`].value);
      }
      return { tags: [...tags, ''] };
    });
  }
  deleteTag(index) {
    this.setState((prevState) => {
      const prevTags = prevState.tags;
      const tags = [];
      for (let i = 0; i < prevTags.length; i += 1) {
        tags.push(this[`tag.${i}`].value);
      }
      const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)];
      return { tags: newTags };
    });
  }
  renderTags(tags) {
    return (
      <Tags>
        {tags.map((tag, index) => {
          const key = makeId();
          return (
            <InputTagWrapper key={key}>
              <Input
                innerRef={(comp) => {
                  this[`tag.${index}`] = comp;
                }}
                type="text"
                placeholder="Dein Tag"
                defaultValue={tag}
              />
              <DeleteButton onClick={() => this.deleteTag(index)}>
                <CloseIcon />
              </DeleteButton>
            </InputTagWrapper>
          );
        })}
        <SmallButton onClick={() => this.addTag()}>+ Tag</SmallButton>
      </Tags>
    );
  }
  render() {
    const { urlError, tags, redirectSuccess } = this.state;
    const { errorMessage, toggleAddLink, standalone } = this.props;
    let apiUrlError = null;
    if (errorMessage && errorMessage.startsWith('You have already saved this url')) {
      apiUrlError = 'Du hast diesen Link bereits gespeichert';
    }
    if (errorMessage && errorMessage === 'Verify Email Address first') {
      apiUrlError = 'Bitte verifiziere erst deine Email';
    }
    if (standalone && redirectSuccess) {
      return <Redirect to="/" />;
    }
    return (
      <AddLinkWrapper>
        <FormElement>
          <Label>Link hinzufügen</Label>
          <Input
            innerRef={(comp) => {
              this.url = comp;
            }}
            type="url"
            placeholder="https://deineurl.de"
          />
          <Error errorMessage={urlError} />
          <Error errorMessage={apiUrlError} />
        </FormElement>
        {this.renderTags(tags)}
        <AddButtonWrapper>
          <Button onClick={e => this.addAction(e)}>Hinzufügen</Button>
        </AddButtonWrapper>
        {!standalone ? (
          <CloseButton onClick={() => toggleAddLink()}>
            <CloseIcon />
          </CloseButton>
        ) : null}
      </AddLinkWrapper>
    );
  }
}

LinkAdd.propTypes = {
  errorMessage: PropTypes.string,
  toggleAddLink: PropTypes.func,
  sendData: PropTypes.func,
};

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  &:hover {
    color: var(--red);
  }
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddLinkWrapper = styled.div`
  max-width: 66em;
  padding: 1em;
  box-shadow: var(--box-shadow);
  background-color: white;
  margin: 1em auto;
  position: relative;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const InputTagWrapper = styled.div`
  position: relative;
  margin-right: 1em;
  margin-bottom: 1em;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`;

export default LinkAdd;
