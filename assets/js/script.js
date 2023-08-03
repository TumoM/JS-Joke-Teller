const audioElement = document.getElementById('audio');
const buttonElement = document.getElementById('button');


// Pass joke to VoiceRSS SDK
function sayJoke(joke='Hello, world!') {
    const jokeString = joke.trim().replace(/ /g, '%20')
    VoiceRSS.speech({
        key: 'c04904bcfbad4c0f8017267785b6c9f8',
        src: jokeString,
        hl: 'en-us',
        v: 'Nancy',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    buttonElement.disabled = true;
    let joke = '';
    const apiUrl = "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit";
    try {
        const data = await (await fetch(apiUrl)).json();
        // Jokes can be in 1 or 2 parts. So build the string depending on type.
        joke = data?.joke || data?.setup + ' ... ' + data?.delivery
        sayJoke(joke)
    } catch (error) {
        // Catch Errors Here
        console.error('Error fetching jokes', error);
        buttonElement.disabled = false;
    }
}

// Get new joke on button press
buttonElement.addEventListener('click',getJokes)

// Enable the button only one the src is changed (i.e the audio has been loaded and is playing.)
audioElement.addEventListener('ended',()=>{
    buttonElement.disabled = false;
})
