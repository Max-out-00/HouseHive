import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

function Home() {
  return <main>
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow">A better place to land</p>
        <h1>Find a home that feels like <em>yours.</em></h1>
        <p className="hero-text">Thoughtful spaces for the way you live, work, and grow. Discover homes with character in places worth calling home.</p>
        <div className="search-bar"><span>⌕</span><input aria-label="Search location" placeholder="Where do you want to live?" /><Link className="button" to="/listings">Search homes</Link></div>
        <div className="hero-note"><span>●</span> Curated listings, real people, zero guesswork.</div>
      </div>
      <div className="hero-image"><img src={heroImage} alt="A sunlit home surrounded by greenery" /></div>
    </section>
    <section className="home-intro page"><div><p className="eyebrow">The HouseHive difference</p><h2>More than four walls.</h2></div><p className="intro-copy">Home is the backdrop to your everyday. We make finding the right one feel more human, with honest listings and a community that cares about where you land.</p></section>
    <section className="values page"><div><strong>01</strong><h3>Good homes, carefully chosen</h3><p>Spaces with light, soul, and room for real life.</p></div><div><strong>02</strong><h3>Simple from search to keys</h3><p>Clear details and an easier way to make your next move.</p></div><div><strong>03</strong><h3>People at the heart</h3><p>A trusted community of renters and thoughtful hosts.</p></div></section>
  </main>;
}

export default Home;