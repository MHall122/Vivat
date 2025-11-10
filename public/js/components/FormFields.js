// Helper input components
function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-wine font-bold mb-2">{label}:</label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2" 
        style={{ borderColor: '#722f37' }} 
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div>
      <label className="block text-wine font-bold mb-2">{label}:</label>
      <textarea 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        rows={rows} 
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2" 
        style={{ borderColor: '#722f37' }} 
      />
    </div>
  );
}
