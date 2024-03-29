import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, mein Name ist </h1>;
  const two = <h2 className="big-heading">Nikola Brasnic.</h2>;
  const three = <h3 className="big-heading">Ich konzipiere und entwickle Web- und Mobile-Apps.</h3>;
  const four = (
    <>
      <p>
      Als angehender Software-Ingenieur mit Fokus auf Frontend-Entwicklung konzentriere ich mich auf die Entwicklung außergewöhnlicher digitaler Erlebnisse, 
      einschließlich Benutzeroberflächen(UI). Zukünftig plane ich auch die Entwicklung von {' '}
        <a href="https://upstatement.com/" target="_blank" rel="noreferrer">
        mobilen Spielen
        </a>
        .
      </p>
    </>
  );



  
  <><div v-if="!isMobile()" class="language-container">
    <Language language="Python" link="https://github.com/markuskooche/ChessGame" file="./logos/python.svg" />
    <Language language="Vue.js" link="https://github.com/markuskooche/PortfolioWebpage" file="./logos/vue.svg" />
    <Language language="Laravel" link="https://spaceplace.pangoon.de" file="./logos/laravel.svg" />
  </div><div v-if="isMobile()" class="language-container-mobile">
      <LanguageMobile language="Python" link="https://github.com/markuskooche/ChessGame" file="./logos/python.svg" />
      <LanguageMobile language="Vue.js" link="https://github.com/markuskooche/PortfolioWebpage" file="./logos/vue.svg" />
      <LanguageMobile language="Laravel" link="https://spaceplace.pangoon.de" file="./logos/laravel.svg" />
    </div></>








  const five = (
    <a
      className="email-link"
      href="https://www.linkedin.com/in/nikola-brasnic-a371641b6/"
      target="_blank"
      rel="noreferrer">
      Folge mir auf LinkedIn
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
