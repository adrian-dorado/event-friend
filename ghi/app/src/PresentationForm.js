import React, { Component } from 'react'

export default class PresentationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presenterName: '',
            presenterEmail: '',
            title: '',
            synopsis: '',
            conferences: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConferencesChange = this.handleConferencesChange.bind(this);
        this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this);
        this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.presenter_name = data.presenterName;
        data.presenter_email = data.presenterEmail;
        delete data.presenterName;
        delete data.presenterEmail;
        delete data.conferences;

        const formTag = document.getElementById('create-presentation-form');
        const formData = new FormData(formTag);
        const confId = formData.get('conference')
        console.log(confId);
        const presentationURL = `http://localhost:8000/api/conferences/${confId}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(presentationURL, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);
        }

        const cleared = {
            presenterName: '',
            presenterEmail: '',
            title: '',
            synopsis: '',
            conference: ''
        }
        this.setState(cleared)
    }

    handlePresenterNameChange(event) {
        const value = event.target.value;
        this.setState({ presenterName: value });
    }

    handlePresenterEmailChange(event) {
        const value = event.target.value;
        this.setState({ presenterEmail: value });
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({ title: value });
    }

    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({ synopsis: value });
    }

    handleConferencesChange(event) {
        const value = event.target.value;
        this.setState({ conference: value });
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ conferences: data.conferences });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePresenterNameChange} value={this.state.presenterName} placeholder="Presenter Name"
                                    required
                                    type="text"
                                    name="presenter_name"
                                    id="presenter_name"
                                    className="form-control" />
                                <label htmlFor="name">Presenter Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePresenterEmailChange} value={this.state.presenterEmail} placeholder="Presenter Email"
                                    required
                                    type="email"
                                    name="presenter_email"
                                    id="presenter_email"
                                    className="form-control" />
                                <label htmlFor="presenter_email">Presenter Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleTitleChange} value={this.state.title} placeholder="Title"
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control" />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="">
                                <textarea onChange={this.handleSynopsisChange} value={this.state.synopsis} placeholder="Synopsis"
                                    required
                                    type="text"
                                    name="synopsis"
                                    rows="3"
                                    id="synopsis"
                                    className="form-control"></textarea>
                                <label htmlFor="synopsis"></label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleConferencesChange} value={this.state.conference} required name="conference" id="conference" className="form-select">
                                    <option value="">
                                        Choose a conference
                                    </option>
                                    {this.state.conferences.map(conference => {
                                        return (
                                            <option key={conference.id} value={conference.id}>
                                                {conference.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
