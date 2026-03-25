const API_URL = "https://notes-api-3ujd.onrender.com/notes";

// Load notes
async function getNotes() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("notesList");
    list.innerHTML = "";

    data.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.content;
        list.appendChild(li);
    });
}

// Add note
async function addNote() {
    const input = document.getElementById("noteInput");

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: input.value
        })
    });

    input.value = "";
    getNotes();
}

// Load on start
getNotes();
