import Nav from './Nav.js';
import AttendeesList from './AttendeesList.js';
import LocationForm from './LocationForm.js';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <Nav />
      <div className="container">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
  );
}

export default App;
