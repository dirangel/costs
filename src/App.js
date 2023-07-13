import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Pages/Home";
import Company from './components/Pages/Company'
import Contact from './components/Pages/Contact'
import Container from "./components/layout/Container";
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Projects from './components/Pages/Projects';
import NewProject from './components/Pages/NewProject';
import Project from './components/Pages/Project'



function App() {
  return (
    <Router>
        <Navbar/>
        <Container customClass="min-height">
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/projects" element={<Projects />}></Route>
              <Route path="/company" element={<Company />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/newproject" element={<NewProject/>}></Route>
              <Route path="/project/:id" element={<Project/>}></Route>
          </Routes>
        </Container>
        <Footer />
    </Router>
  );
}

export default App;
