import React from "react"

import './Button.css';


export default function TabsButton({ children }) {
  return (
    <button className="btn waves-effect waves-light" type="submit" onClick={children.onClick}>
      {children}
    </button>
  )
}
