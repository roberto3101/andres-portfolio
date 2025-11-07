import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Background from './components/Background/Background';
import CustomCursor from './components/CustomCursor/CustomCursor';
import TranslatorWidget from './components/TranslatorWidget/TranslatorWidget';
import './App.css';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <TranslatorWidget />
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;