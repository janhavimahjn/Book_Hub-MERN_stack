import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookHub</h2>
            <p className='fs-17'>Welcome to Book Hub, your one-stop destination for discovering books that captivate your imagination and enrich your soul. Our mission is to make it easier for readers around the globe to find, explore, and connect with the stories they love.</p>
            <p className='fs-17'>Book Hub was born from a simple yet powerful idea: to create a space where readers can discover books effortlessly. As avid readers ourselves, we wanted to combine technology and a love for literature to build a platform that connects people with stories that resonate with them.</p>
            <p className='fs-17'>At Book Hub, we are committed to helping you find the perfect book for every mood, moment, and milestone. Our platform is designed with readers in mind, ensuring a seamless and enriching experience every time you visit.</p>
            <p className='fs-17'>Have questions or suggestions? We’d love to hear from you! Reach us at support@bookhub.com or follow us on Facebook and Instagram.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
