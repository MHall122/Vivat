function LoginModal({ onLogin, onClose, error }) {
  const { useState } = React;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setIsLoggingIn(true);
    await onLogin(username, password);
    setIsLoggingIn(false);
  };

  return (
    <div 
      className="fixed inset-0 modal-overlay flex items-center justify-center p-4" 
      style={{ zIndex: 50 }} 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-8 max-w-md w-full" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold text-wine mb-6 text-center">Admin Login</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-wine font-bold mb-2">Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter username" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2" 
              style={{ borderColor: '#722f37' }} 
              required 
              disabled={isLoggingIn} 
            />
          </div>
          
          <div>
            <label className="block text-wine font-bold mb-2">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2" 
              style={{ borderColor: '#722f37' }} 
              required 
              disabled={isLoggingIn} 
            />
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition" 
              disabled={isLoggingIn}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 bg-wine hover:bg-wine-light text-white rounded-lg transition" 
              style={{ backgroundColor: '#722f37' }} 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
