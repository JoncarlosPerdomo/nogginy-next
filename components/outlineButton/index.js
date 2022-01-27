import React from 'react'

const OutlineButton = (props) => {
  return (
    <button
      type="button"
      className="px-4 py-2 m-4 text-xl text-white rounded-lg outline outline-4 hover:bg-white hover:text-sky-400 hover:outline hover:outline-4 hover:outline-offset-8 hover:outline-sky-400"
      {...props}
    >
      {props.children}
    </button>
  )
}

export default OutlineButton
