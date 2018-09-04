import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import media from '../../media';

import Content from '../Content';
import Button from '../Button';
import ExternalLink from '../ExternalLink';

import Websites from './websites';
import Stripes from './stripes';

const Home = () => {
  const width = window.innerWidth;

  return (
    <div>
      <Helmet title="Startseite | bkmrk" />
      <Stripes />
      <Pad />
      {width > 600 ? <Websites /> : null}

      <Content>
        <H1>Wenn du Links findest und nicht weißt wohin damit...</H1>
        <Intro>
          bkmrk ist die beste Software Plattform für das sammeln und organisieren von Links.{' '}
        </Intro>
        <Link to="/signup">
          <Button>Jetzt starten</Button>
        </Link>

        <FeatureList>
          <Feature>
            <Headline>1. Screenshots</Headline>
            <Desc>
              Von jedem gespeicherten Link wird ein Screenshot gemacht. Du kannst dich errinnern an
              die Seite mit der abfahrenen Grafik, weißt aber nicht mehr um was es ging oder wann du
              die Seite gefunden hast? Der Screenshot kann dir dabei helfen die Seiten wieder zu
              finden. Alternativ nutze die Screenshots als Moodboard für Designs und Inspiration wie
              Pinterest für Bilder
            </Desc>
          </Feature>
          <Feature>
            <Headline>2. Tagging</Headline>
            <Desc>
              Du bist Bookmarking Süchtig und hast mehrere Arten von Links oder willst diese
              gruppieren? Jedem Link lassen sich beliebig viele Tags hinzufügen. Natürlich ist es
              auch möglich nach diesen Tags zu filtern.
            </Desc>
          </Feature>
          <Feature>
            <Headline>3. Crawling</Headline>
            <Desc>
              Du bist unterwegs oder dein Datenvolumen ist begrenzt? Bkmrk crawlt jede Website und
              extrahiert die wichtigsten Informationen für dich. Du kannst dich ganz auf den Inhalt
              konzentrieren. Selbst wenn eine Seite offline sein sollte, hast du weiterhin die
              Möglichkeit die Inhalte zu lesen.
            </Desc>
          </Feature>
          <Feature>
            <Headline>4. Bald auch als App</Headline>
            <Desc>
              Das Handy ist dein täglicher Begleiter und Firefox ist nur auf dem Desktop deine erste
              Wahl? Lesezeichen werden zwangsläufig zum Chaos. Schon bald hast du die Möglichkeit
              über Extensions direkt Links in Erinnerungen zu verwandeln. Du bist super
              interessiert? Dann melde dich doch bei uns für eine Beta Version{' '}
              <ExternalLink href="mailto:app@bkmrk.space">app@bkmrk.space</ExternalLink>
            </Desc>
          </Feature>
        </FeatureList>
      </Content>
    </div>
  );
};

const FeatureList = styled.div`
  margin-top: 5em;
  ${media.tablet`
    width: 55%;
    margin-top: 15em;
  `};
`;

const Feature = styled.div`
  margin-bottom: 3em;
`;

const Headline = styled.h3`
  text-transform: uppercase;
  color: var(--text-color);
  fonz-size: 1.375em;
`;

const Desc = styled.p`
  font-size: 1.1em;
  line-height: 1.5em;
  color: var(--text-color);
`;

const Pad = styled.div`
  height: 3em;
  ${media.tablet`
    height: 11em;
  `};
`;

const H1 = styled.h1`
  color: white;
  font-weight: 400;
  font-size: 1.8em;
  ${media.tablet`
    font-size: 3em;
    width: 60%;
  `};
`;

const Intro = styled.p`
  color: white;
  font-weight: 300;
  line-height: 1.5em;
  max-width: 400px;
  font-size: 1.3em;
`;

export default Home;
