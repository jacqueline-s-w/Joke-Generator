const getJokeUrl = 'https://official-joke-api.appspot.com/random_joke';
const button = document.getElementById('loadJoke');
const jokeDiv = document.getElementById('joke');

// Funktion zum Laden eines Witzes
function loadJoke() {
  jokeDiv.innerHTML = '<p>Lade...</p>';
  button.disabled = true;

  fetch(getJokeUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Netzwerkfehler: ' + response.status);
      }
      return response.json();
    })
    .then(joke => {
      // Witz erst nach 2 Sekunden anzeigen
      setTimeout(() => {
        jokeDiv.innerHTML = `
          <p><strong>${joke.setup}</strong></p>
          <p>${joke.punchline}</p>
        `;
        button.disabled = false;
      }, 2000);
    })
    .catch(error => {
      setTimeout(() => {
        jokeDiv.innerHTML = `<p style="color:red;">Fehler: ${error.message}</p>`;
        button.disabled = false;
      }, 5000);
    });
}

// Klick-Event
button.addEventListener('click', loadJoke);

// Enter-Taste auslösen
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    loadJoke();
  }
});
