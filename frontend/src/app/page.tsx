"use client";

import { useState } from "react";
import Notes from "@/app/components/notes/notes";
import api from "@/services/api";

type Note = {
  id: string;
  title: string;
  notes: string;
  priority: boolean;
}

export default function Home() {
  
  const [selectedValue, setSelectedValue] = useState("all");
  const [title, setTitles] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState<Note[]>([]);


  async function handleSubmit(e: any) {
    e.preventDefault();
    // return console.log(title, notes);

    const response = await api.post("/annotations", {
      title,
      notes,
      priority: false,
    });

    setTitles("");
    setNotes("");


  };



  return (
    <>
      <div id="app">
        <aside>
          <strong>Caderno de Notas</strong>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="title">Título da Anotação</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                maxLength={30}
                value={title}
                onChange={(e) => setTitles(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="nota">Anotação</label>
              <textarea 
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)} 
              />
            </div>
            <button id="btn_submit" type="submit">Salvar</button>
          </form>
        </aside>
        <main>
          <ul>
            <Notes />
          </ul>
        </main>
      </div>
    </>
  );
}
