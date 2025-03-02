import React from 'react'

const ClearIcon: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <svg
    fill="#c4c4c4"
    width="19px"
    height="19px"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#c4c4c4"
    onClick={onClick}
    style={{ cursor: 'pointer' }} >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M896 512c0-212.077-171.921-384-384-384-212.077 0-384 171.923-384 384 0 212.079 171.923 384 384 384 212.079 0 384-171.921 384-384zM579.883 398.863c12.497-12.497 32.759-12.497 45.257 0 12.493 12.497 12.493 32.757 0 45.254L557.257 512l67.878 67.883c12.497 12.497 12.497 32.759 0 45.257-12.493 12.493-32.755 12.493-45.252 0L512 557.257l-67.883 67.883c-12.497 12.493-32.757 12.493-45.254 0-12.497-12.497-12.497-32.759 0-45.257L466.744 512l-67.881-67.883c-12.497-12.497-12.497-32.758 0-45.254s32.757-12.497 45.254 0L512 466.744l67.883-67.881z"></path>
    </g>
  </svg>
)

export default ClearIcon
