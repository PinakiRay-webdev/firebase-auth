import React from 'react'

const User = () => {

  const user = JSON.parse(localStorage.getItem('accountCredentials'))
  

  return (
    <div className='w-full h-fit' >
      <div className='max-w-screen-xl mx-auto' >
        <h1>
            Hi {user.mail}
        </h1>
      </div>
    </div>
  )
}

export default User
