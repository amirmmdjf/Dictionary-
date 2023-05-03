let input = document.querySelector('.input')
let searchBtn = document.querySelector('.btn-search')
let title = document.querySelector('.main-title')
let phonetic = document.querySelector('.phonetic')
let definition = document.querySelector('.definition')
let linkWiki = document.querySelector(".wiki")
let pronouns;
let volumeIcon = document.querySelector(".bi-volume-up")


let deafulteAudio = new Audio('https://api.dictionaryapi.dev/media/pronunciations/en/black-uk.mp3');

volumeIcon.addEventListener('click', () => {
    deafulteAudio.play();
});


let apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

function fetchData() {
    let worldValue = input.value;
    fetch(`${apiUrl}${worldValue}`)
        .then(res => res.json())
        .then(e => {
            console.log(e)
            showData(e)
        })
}

function showData(data) {
    title.innerHTML = `${data[0].word.charAt(0).toUpperCase() + data[0].word.slice(1)}`
    linkWiki.setAttribute('href', `${data[0].sourceUrls}`)
    phonetic.innerText = ""
    phonetic.innerText += `${data[0].meanings[0].partOfSpeech} ${data[0].phonetic}`
    definition.innerHTML = `${data[0].meanings[0].definitions[0].definition}`
    pronouns = new Audio(`${data[0].phonetics[0].audio}`)

    volumeIcon.addEventListener("click", () => {
        pronouns.play();
        deafulteAudio.pause()
    })
}


searchBtn.addEventListener("click", function () {
    fetchData()
});


input.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        fetchData()
    }
})
