
// Local character storage
let characters = [];

// EXP = word count
function calculateExpFromText(text) {
  const words = text.trim().split(/\s+/).length;
  return words;
}
// Generate a logo char
async function generateLogo(prompt) {
  try {
    const response = await fetch("/api/generate-logo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    if (data.imageUrl) {
      return data.imageUrl;
    } else {
      console.error(data.error);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}


// Create a character object + render
function addCharacter(text, name, book, chapters) {
  if (!text || !name || !book || !chapters) {
    alert("Please fill all fields.");
    return;
  }

  async function addCharacter(text, name, book, chapters) {
  if (!text || !name || !book || !chapters) {
    alert("Please fill all fields.");
    return;
  }

  const exp = calculateExpFromText(text);

  // Generate a logo from the text
  const logoUrl = await generateLogo(text);

  const character = {
    name,
    book,
    chapters,
    exp,
    logoUrl
  };

  characters.push(character);
  renderCharacters();
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
      <h3>${char.name}</h3>
      <p><strong>Book:</strong> ${char.book}</p>
      <p><strong>Chapters:</strong> ${char.chapters}</p>
      <p><strong>EXP:</strong> ${char.exp}</p>
      ${char.logoUrl ? `<img src="${char.logoUrl}" alt="${char.name}" />` : ""}
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











