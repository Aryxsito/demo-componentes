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

export default PostItNote;