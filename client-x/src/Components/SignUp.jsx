function SignUp() {


  return (
    <div>
      
      <form className="m-5">
            <h1>Sign Up</h1>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Enter email" id="email" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Enter password" id="pwd" />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
