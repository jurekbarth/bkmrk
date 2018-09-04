import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { makeId } from '../../helpers';

import ArrowLeft from '../ArrowLeft';
import Content from '../Content';
import Input from '../Input';
import Textarea from '../Textarea';
import ButtonSmall from '../ButtonSmall';
import Button from '../Button';
import CloseIcon from '../CloseIcon';
import FormElement from '../FormElement';
import Label from '../Label';
import Error from '../Error';

class BookmarkDetail extends React.Component {
  constructor(props) {
    super(props);
    this.updateLink = this.updateLink.bind(this);
    this.state = {
      title: null,
      author: null,
      excerpt: null,
      tags: [''],
      // states 0: No state, 1: sending, 2: updated, 4: failure
      status: 0,
    };
  }
  componentWillMount() {
    // logic for resetting form
    const { data } = this.props;
    const tags = data.tags.map(tag => tag.title);
    this.setState(() => {
      return {
        title: data.title,
        author: data.author,
        excerpt: data.excerpt,
        tags,
      };
    });
  }
  componentWillReceiveProps(nextProps) {
    // logic for resetting form
    this.setState(() => {
      return { status: nextProps.status };
    });
  }
  updateLink(e) {
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
    const ok = true;
    const title = this.title.value;
    const author = this.author.value;
    const excerpt = this.excerpt.value;
    const filteredTags = allTags.filter(tag => tag.length >= 1 && tag.length < 40);
    const tags = filteredTags.map(tag => ({
      title: tag,
    }));
    const data = {
      uuid: this.props.data.uuid,
      title,
      author,
      excerpt,
      tags,
    };
    if (ok) {
      this.setState(() => {
        return { status: 1 };
      });
      this.props.updateLink(data);
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
        <ButtonSmall onClick={() => this.addTag()}>+ Tag</ButtonSmall>
      </Tags>
    );
  }
  render() {
    const { history } = this.props;
    const {
      title, author, excerpt, tags, status,
    } = this.state;
    const titleError = null;
    return (
      <Content>
        <ButtonWrapper>
          <Backbutton onClick={() => history.goBack()}>
            <ArrowLeft />
            <span>Zurück zur Übersicht</span>
          </Backbutton>
          <DeleteBookmark>Löschen</DeleteBookmark>
        </ButtonWrapper>
        <EditLinkWrapper>
          <FormElement>
            <Label>Titel</Label>
            <Input
              innerRef={(comp) => {
                this.title = comp;
              }}
              type="text"
              defaultValue={title}
            />
            <Error errorMessage={titleError} />
          </FormElement>
          <FormElement>
            <Label>Autor</Label>
            <Input
              innerRef={(comp) => {
                this.author = comp;
              }}
              type="text"
              defaultValue={author}
            />
            <Error errorMessage={titleError} />
          </FormElement>
          <FormElement>
            <Label>Beschreibung</Label>
            <Textarea
              maxLength="250"
              innerRef={(comp) => {
                this.excerpt = comp;
              }}
              defaultValue={excerpt}
            />
            <Error errorMessage={titleError} />
          </FormElement>
          {this.renderTags(tags)}
          <UpdateButtonWrapper>
            {status === 2 ? <Success>Gespeichert</Success> : null}
            <Button disabled={status === 1} onClick={() => this.updateLink()}>
              Speichern
            </Button>
          </UpdateButtonWrapper>
        </EditLinkWrapper>
      </Content>
    );
  }
}

BookmarkDetail.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  updateLink: PropTypes.func,
  status: PropTypes.number,
};

const Success = styled.p`
  margin: 0 1em 0 0;
`;

const DeleteBookmark = styled.p`
  margin: 0;
  color: var(--red);
  cursor: pointer;
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

const EditLinkWrapper = styled.div`
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

export default BookmarkDetail;
