import './App.css';
import SideBar from './components/SideBarComponent';
import { Route, Routes } from 'react-router-dom';
import Home from './components/HomeComponent';
import PastLaunches from './components/PastLaunches';
import PastLaunchDetails from './components/PastLaunchDetailsComponent';
import UpcomingLaunches from './components/UpcomingLaunches';

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar></SideBar>
      <section style={{ width:"100%" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pastLaunches" element={<PastLaunches />}/>
          <Route path="upcomingLaunches" element={<UpcomingLaunches />} />
          <Route path="pastLaunches/details/:id" element={<PastLaunchDetails />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
