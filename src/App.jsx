import Storm from './components/Storm'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Storm />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <div className="about-contact">
          <About />
          <Contact />
        </div>
      </main>
    </>
  )
}

export default App