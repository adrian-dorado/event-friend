import Nav from './Nav.js';
import AttendeesList from './AttendeesList.js';
import LocationForm from './LocationForm.js';
import ConferenceForm from './ConferenceForm.js';
import PresentationForm from './PresentationForm.js';
import AttendeesForm from './AttendeesForm.js';
import MainPage from './MainPage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='attendees/new' element={<AttendeesForm />} />
          <Route path='presentations/new' element={<PresentationForm />} />
          <Route path='conferences/new' element={<ConferenceForm />} />
          <Route path='locations/new' element={<LocationForm />} />
          <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;


