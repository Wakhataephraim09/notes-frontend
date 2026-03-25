const API_URL = "https://notes-api-3ujd.onrender.com/notes";

// Load notes
async function getNotes() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("notesList");
    list.innerHTML = "";

    data.forEach(note => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${note.content}
            <button onclick="deleteNote(${note.id})" style="float:right; background:red;">X</button>
        `;

        list.appendChild(li);
    });
}

// Add note
async function addNote() {
    const input = document.getElementById("noteInput");

    if (!input.value) return;

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

// Delete note
async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    getNotes();
}

// Load on start
getNotes();
