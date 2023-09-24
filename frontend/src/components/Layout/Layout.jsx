import React from 'react'
import './Layout.css'

function Layout({children}) {
  return (
    <div className="outer">
        <div className="inner">
            {children}
        </div>
    </div>
  )
}

export default Layout