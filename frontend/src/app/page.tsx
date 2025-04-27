"use client";

import Notes from "@/app/components/notes/notes";
import api from "@/services/api";
import { useEffect, useState } from "react";
import ColorRadioButtons from "./components/RadioButton/RadioBuitton";

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


  useEffect(() => {
    getAllNotes();
  },[]);

  async function getAllNotes() {
    const response = await api.get<Note[]>("/annotations");
    setAllNotes(response.data)
  };


  async function handleDelete(id: string) {
    const deleteNote = await api.delete(`/annotations/${id}`);

    if (deleteNote) {
      setAllNotes(allNotes.filter((note) => note.id !== id))
    }
  }

  async function handleChangePriority(id: string) {
    const note = await api.put(`/priorities/${id}`);

    getAllNotes();    
  }

  async function loadNotes(option: any) {
    const params = { priority: option };
    //console.log(params);
    const response = await api.get<Note[]>("/priorities", { params });
    //console.log(response.data);

    if (response) {
      setAllNotes(response.data);
    }

  };

  const handleChange = (e: any) => {
    setSelectedValue(e.value)

    if (e.checked && e.value !== "all") {
      loadNotes(e.value);
    } else {
      getAllNotes();
    }
  };




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

    
    if (selectedValue !== "all") {
      getAllNotes();
    } else {
      setAllNotes([...allNotes, response.data]);
    }


  };



  useEffect(() => {
    function enableSubmitButton(){
      let btn = document.getElementById("btn_submit") as HTMLButtonElement;
      if (!btn) return;
      btn.style.background = "#c8b6ff"
      btn.style.cursor = "not-allowed"
      btn.style.color = "#6c757d"
      btn.disabled = true;

      if (title && notes) {
        btn.style.background = "#bb86fc"
        btn.style.cursor = "pointer"
        btn.style.color = "#1d1d1d"
        btn.disabled = false;
      }
    }
    enableSubmitButton();
  },[title, notes]);



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
          <ColorRadioButtons 
            selectedValue={selectedValue}
            handleChange={handleChange}
          />
        </aside>
        <main>
          <ul>
            {allNotes.map((data) => (
              <Notes 
                key={data.id}
                note={data}
                handleDelete={handleDelete}
                handleChangePriority={handleChangePriority}
              />
            ))} 
          </ul>
        </main>
      </div>
    </>
  );
}
