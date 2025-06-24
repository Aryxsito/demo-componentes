import React, { useState, useEffect } from 'react';
import NoteForm from'./components/note-form.component';
import PostItNote from './components/post-it.component';

// Componente principal de la aplicación
const PostItSimulator = () => {
  // Inicializar el estado con las notas guardadas en localStorage
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('postItNotes');
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error('Error al cargar las notas:', error);
      return [];
    }
  });

  // Guardar notas en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('postItNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes(prev => [...prev, newNote]);
  };

  const deleteNote = (noteId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Post It Simulator!
          </h1>
        </header>

        {/* Formulario para agregar notas */}
        <NoteForm onAddNote={addNote} />

        {/* Grid de notas Post-it */}
        <div className="flex flex-wrap gap-6 justify-center items-start">
          {notes.map((note, index) => (
            <div
              key={note.id}
              className={index % 4 === 1 ? 'transform -rotate-2' : 
                       index % 4 === 2 ? 'transform rotate-2' : 
                       index % 4 === 3 ? 'transform -rotate-1' : 'transform rotate-1'}
            >
              <PostItNote
                note={note}
                onDeleteNote={deleteNote}
              />
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay notas */}
        {notes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-lg">
              ¡Agrega tu primera nota Post-it!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItSimulator;
