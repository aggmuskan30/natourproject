import React from 'react';

const Stories = () => {
  return (
    <section className="section-story" id="feedback">
      <div className="bg-video">

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
            <figcaption className="story__figcaption">Muskan Aggarwal</figcaption>
          </figure>
          <div className="story__text">
            <h3 className="heading-tertiary u-margin-bottom-small">I had the best week ever with my family</h3>
            <p>
               Had a great time with my family in Kerala all possible because of Natours .Quiet mornings, open skies, and moments that reminded us what togetherness really feels like. 
               This was not just a trip ,it was a memory we will carry for life.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="story">
          <figure className="story__shape">
            <img className="story__img" src="/img/nat-9.jpg" alt="person on a tour" />
            <figcaption className="story__figcaption">Shubham</figcaption>
          </figure>
          <div className="story__text">
            <h3 className="heading-tertiary u-margin-bottom-small">WOW! my life is completely different now</h3>
            <p>
              I went looking for a break and came back with clarity. Walking alone through mountains and sunsets helped me slow down,
               breathe, and rediscover myself. Sometimes, 
              all it takes is one journey to change how you see everything.
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