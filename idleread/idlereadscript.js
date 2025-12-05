
// Local character storage
let characters = [];

// EXP = word count
function calculateExpFromText(text) {
  const words = text.trim().split(/\s+/).length;
  return words;
}

// Create a character object + render
function addCharacter(text, name, book, chapters) {
  if (!text || !name || !book || !chapters) {
    alert("Please fill all fields.");
    return;
  }

  const exp = calculateExpFromText(text);

  const character = {
    name,
    book,
    chapters,
    exp,
    image: null  // Placeholder for GPT-generated logo
  };

  characters.push(character);
  renderCharacters();
}

// Render character cards
function renderCharacters() {
  const container = document.getElementById("characterList");
  container.innerHTML = "";

  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "character-card";

    card.innerHTML = `
      <div class="character-image">
        <!-- Later replaced with GPT-generated image -->
        ${char.image ? `<img src="${char.image}" style="width:100%; height:100%; border-radius:6px;">` : ""}
      </div>

      <h3>${char.name}</h3>
      <p><strong>Book:</strong> ${char.book}</p>
      <p><strong>Chapters:</strong> ${char.chapters}</p>
      <p><strong>EXP:</strong> ${char.exp}</p>
    `;

    container.appendChild(card);
  });
}

// Hook up form
document.getElementById("addCharacterBtn").addEventListener("click", () => {
  const text = document.getElementById("characterDescription").value;
  const name = document.getElementById("characterName").value;
  const book = document.getElementById("bookName").value;
  const chapters = parseInt(document.getElementById("chapterCount").value);

  addCharacter(text, name, book, chapters);
});











