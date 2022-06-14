window.addEventListener('DOMContentLoaded', async () => {
    
    const url = 'http://localhost:8000/api/locations/';
    const response = await fetch(url);

    if (!(response.ok)) {
        throw new Error('Response was really not okay 🥺')
    } else {
        const data = await response.json();
        console.log(data);

        const locationTag = document.getElementById('location')
        for (let location of data.locations) {
            const optionLoc = document.createElement('option')
            optionLoc.innerHTML = location.name;
            optionLoc.value = location.id;
            locationTag.appendChild(optionLoc)
        }
        const formTag = document.getElementById('create-conference-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const conferenceURL = 'http://localhost:8000/api/conferences/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(conferenceURL, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newConference = await response.json();
                console.log(newConference);
            }
        })
    }
})