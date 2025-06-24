import { useState } from "react";
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

export default NoteForm; 