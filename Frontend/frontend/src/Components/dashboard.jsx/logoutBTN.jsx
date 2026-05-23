import React from 'react'

const logoutBTN = () => {
    // REMOVE TOKEN

  localStorage.removeItem("token");

  // REMOVE USER ID

  localStorage.removeItem("userID");

  // REDIRECT TO LOGIN

  window.location.href = "/";
  return (
    <div>
        <button onClick={logoutBTN}>
            Logout
        </button>
    </div>
  )
}

export default logoutBTN