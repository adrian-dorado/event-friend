import React, { Component } from 'react'

export default class ConferenceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationChange = this.handleMaxPresentationChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.max_presentations = data.maxPresentations
        data.max_attendees = data.maxAttendees
        delete data.maxPresentations
        delete data.maxAttendees
        delete data.locations

        const conferenceURL = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceURL, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);
        }

        const cleared = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            location: ''
        };
        this.setState(cleared)
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleStartDateChange(event) {
        const value = event.target.value;
        this.setState({ starts: value });
    }

    handleEndDateChange(event) {
        const value = event.target.value;
        this.setState({ ends: value });
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({ description: value })
    }

    handleMaxPresentationChange(event) {
        const value = event.target.value;
        this.setState({ maxPresentations: value });
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({ maxAttendees: value });
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({ location: value });
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ locations: data.locations });
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name"
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleStartDateChange} value={this.state.starts} placeholder="Start Date"
                                    required
                                    type="date"
                                    name="starts"
                                    id="starts"
                                    className="form-control" />
                                <label htmlFor="start_date">Start Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEndDateChange} value={this.state.ends} placeholder="End Date"
                                    required
                                    type="date"
                                    name="ends"
                                    id="ends"
                                    className="form-control" />
                                <label htmlFor="end_date">End Date</label>
                            </div>
                            <div className="">
                                <textarea onChange={this.handleDescriptionChange} value={this.state.description} placeholder="Description"
                                    required
                                    type="text"
                                    name="description"
                                    rows="3"
                                    id="description"
                                    className="form-control"></textarea>
                                <label htmlFor="description"></label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxPresentationChange} value={this.state.maxPresentations} placeholder="Maximum presentations"
                                    required
                                    type="number"
                                    name="max_presentations"
                                    id="max_presentations"
                                    className="form-control" />
                                <label htmlFor="max_presentations">Max presentations</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxAttendeesChange} value={this.state.maxAttendees} placeholder="Maximum attendees"
                                    required
                                    type="number"
                                    name="max_attendees"
                                    id="max_attendees"
                                    className="form-control" />
                                <label htmlFor="max_attendees">Max attendees</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleLocationChange} value={this.state.location} required name="location" id="location" className="form-select">
                                    <option value="">Choose a place</option>
                                    {this.state.locations.map(location => {
                                        return (
                                            <option key={location.id} value={location.id}>
                                                {location.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-outline-dark">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
