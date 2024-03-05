import { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful login
        console.log('SignUp successful');
        
      } else {
        // Handle login error
        console.error('SignUp failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="m-5">
            <h1>Sign Up</h1>
        <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => 
            setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
