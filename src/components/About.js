import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <section className="about-intro">
          <h1>About Bridgette</h1>
          <div className="about-content">
            <div className="about-text">
              <p>
                Welcome to my artistic journey. I'm Bridgette, a passionate artist 
                who finds inspiration in the world around me. My work spans across 
                various mediums and styles, each piece telling its own unique story.
              </p>
              <p>
                Art has always been my way of expressing emotions, capturing moments, 
                and sharing my perspective with the world. Each collection represents 
                a different phase of my artistic evolution, reflecting my growth as 
                both an artist and a person.
              </p>
              <p>
                I believe that art should evoke emotion, spark conversation, and 
                create connections between people. Whether you're here to browse, 
                purchase, or commission a piece, I hope my work resonates with you 
                and brings a touch of beauty to your world.
              </p>
            </div>
            <div className="about-image">
              <div className="artist-photo-placeholder">
                <p>Artist Photo</p>
              </div>
            </div>
          </div>
        </section>

        <section className="artistic-journey">
          <h2>My Artistic Journey</h2>
          <div className="journey-timeline">
            <div className="timeline-item">
              <h3>Early Beginnings</h3>
              <p>
                My love for art began in childhood, drawing inspiration from 
                nature and the vibrant colors of everyday life.
              </p>
            </div>
            <div className="timeline-item">
              <h3>Formal Training</h3>
              <p>
                I honed my skills through formal education and workshops, 
                learning various techniques and exploring different mediums.
              </p>
            </div>
            <div className="timeline-item">
              <h3>Professional Practice</h3>
              <p>
                Today, I continue to create and share my work, always pushing 
                the boundaries of my artistic expression.
              </p>
            </div>
          </div>
        </section>

        <section className="commission-info">
          <h2>Commission Work</h2>
          <p>
            I'm always excited to work on custom pieces. Whether you have a 
            specific vision in mind or want to collaborate on something unique, 
            I'd love to hear from you. Each commission is a special opportunity 
            to create something meaningful and personal.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;