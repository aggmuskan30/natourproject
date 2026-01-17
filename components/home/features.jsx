import React from 'react';

const Features = () => {
  return (
    <section className="section-features" id="section-features">
      <div className="row">
        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-world"></i>
            <h3 className="heading-tertiary u-margin-bottom-small">Explore the world</h3>
            <p className="feature-box__text">
             Step away from noise, screens, and routines. Breathe air that feels lighter, hear silence that speaks louder,
              and rediscover a version of yourself you forgot existed. 
             
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-compass"></i>
            <h3 className="heading-tertiary u-margin-bottom-small">Meet nature</h3>
            <p className="feature-box__text">
              Sometimes getting lost is the only way to find yourself. Walk unfamiliar paths, follow sunsets instead of schedules,
               and let the journey teach you what no routine ever could.
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-map"></i>
            <h3 className="heading-tertiary u-margin-bottom-small">Find your way</h3>
            <p className="feature-box__text">
             Sometimes getting lost is the only way to find yourself. Walk unfamiliar paths, 
             follow sunsets instead of schedules, and let the journey teach you what no routine ever could.
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-heart"></i>
            <h3 className="heading-tertiary u-margin-bottom-small">Live a healthy life</h3>
            <p className="feature-box__text">
              Not the kind measured by steps or calories but by peace, clarity, and joy. Travel that heals your mind, 
              strengthens your soul, and reminds you what it truly means to feel alive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;