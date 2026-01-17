import React from 'react';

const Stories = () => {
  return (
    <section className="section-story" id="feedback">
      <div className="bg-video">
        {/* React uses camelCase for autoPlay */}
        <video className="bg-video__content" autoPlay loop muted>
          <source src="/img/video.mp4" type="video/mp4" />
          <source src="/img/video.webm" type="video/webm" />
          Your browser is not supported!
        </video>
      </div>

      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">We make people genuinely happy</h2>
      </div>

      <div className="row">
        <div className="story">
          <figure className="story__shape">
            <img className="story__img" src="/img/nat-8.jpg" alt="person on a tour" />
            <figcaption className="story__figcaption">Mary Smith</figcaption>
          </figure>
          <div className="story__text">
            <h3 className="heading-tertiary u-margin-bottom-small">I had the best week ever with my family</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aspernatur quibusdam commodi
              repudiandae voluptas non iste facilis, aliquid consequuntur ab quod quae alias saepe nulla
              earum incidunt reiciendis! Sed?
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="story">
          <figure className="story__shape">
            <img className="story__img" src="/img/nat-9.jpg" alt="person on a tour" />
            <figcaption className="story__figcaption">Jack Wilson</figcaption>
          </figure>
          <div className="story__text">
            <h3 className="heading-tertiary u-margin-bottom-small">WOW! my life is completely different now</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aspernatur quibusdam commodi
              repudiandae voluptas non iste facilis, aliquid consequuntur ab quod quae alias saepe nulla
              earum incidunt reiciendis! Sed?
            </p>
          </div>
        </div>
      </div>

      <div className="u-center-text u-margin-top-big">
        <a href="#" className="btn-text">Read All stories &rarr;</a>
      </div>
    </section>
  );
};

export default Stories;