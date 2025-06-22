import React, { useState, useEffect } from 'react';

// Componente para el formulario de agregar notas
const NoteForm = ({ onAddNote }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isImportant: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddNote({
        id: Date.now(),
        title: formData.title.trim() || 'Sin título',
        description: formData.description.trim(),
        isImportant: formData.isImportant,
        createdAt: new Date().toISOString()
      });
      setFormData({ title: '', description: '', isImportant: false });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4 justify-center">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="px-4 py-2 rounded-md border-0 bg-white text-gray-800 placeholder-gray-500 shadow-sm"
          placeholder="Título"
          style={{ width: '200px' }}
        />
        
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={`px-4 py-2 rounded-md border-0 bg-white text-gray-800 placeholder-gray-500 shadow-sm ${
            errors.description ? 'ring-2 ring-red-500' : ''
          }`}
          placeholder="Descripción"
          style={{ width: '250px' }}
        />

        <label className="flex items-center gap-2 text-white font-medium">
          <input
            type="checkbox"
            name="isImportant"
            checked={formData.isImportant}
            onChange={handleChange}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          Importante!
        </label>

        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-md transition-colors duration-200 shadow-sm"
          style={{ minWidth: '120px' }}
        >
          AGREGAR
        </button>
      </div>
      
      {errors.description && (
        <p className="text-center mt-2 text-red-400 text-sm">
          {errors.description}
        </p>
      )}
    </div>
  );
};

// Componente individual para cada nota (Post-it)
const PostItNote = ({ note, onDeleteNote }) => {
  return (
    <div 
      className={`relative ${
        note.isImportant ? 'bg-red-400' : 'bg-yellow-300'
      } p-4 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-200`}
      style={{
        width: '200px',
        height: '200px',
        fontFamily: 'Comic Sans MS, cursive, sans-serif'
      }}
    >
      {/* Botón X para eliminar */}
      <button
        onClick={() => onDeleteNote(note.id)}
        className="absolute top-1 right-2 text-black font-bold text-lg hover:text-red-600 transition-colors duration-200"
        style={{ fontSize: '16px', lineHeight: '1' }}
      >
        ×
      </button>

      {/* Título de la nota */}
      <h3 className="font-bold text-black mb-2 pr-4 text-base leading-tight">
        {note.title}
      </h3>

      {/* Descripción */}
      <div className="text-black text-sm leading-relaxed overflow-hidden">
        {note.description.split('\n').map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const PostItSimulator = () => {
  const [notes, setNotes] = useState(JSON.stringify(localStorage.getItem('postItNotes')) || []);

  // Cargar notas desde localStorage al iniciar
  useEffect(() => {
    const savedNotes = notes;
    console.log(savedNotes)
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Error al cargar las notas:', error);
      }
    }
  }, []);

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