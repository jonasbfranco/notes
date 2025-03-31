export default function Home() {
  return (
    <>
      <div id="app">
        <aside>
          <strong>Caderno de Notas</strong>
          <form action="">
            <div className="input-block">
              <label htmlFor="title">Título da Anotação</label>
              <input type="text" id="title" name="title" required maxLength={30}/>
            </div>
            <div className="input-block">
              <label htmlFor="nota">Anotação</label>
              <textarea required />
            </div>
            <button id="btn_submit" type="submit">Salvar</button>
          </form>
        </aside>
        <main>
          <div>notes</div>
        </main>
      </div>
    </>
  );
}
