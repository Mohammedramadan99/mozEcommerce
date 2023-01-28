import React from 'react'

function Note() {
  return (
    <>
      <div 
      style={{ backgroundColor: "#ef233c", color: "#fff", padding: "5px", fontSize: "15px", textAlign: "center" }}>
        some actions will be slow because I use the Shared Cluster of mongodb (free)
      </div>
      <div style={{ position: "fixed", bottom: "0", color: "#ef233c",fontWeight:"700", padding: "5px", fontSize: "15px", textAlign: "center",zIndex:"1000"}}>v 1.3</div>
    </>
  )
}

export default Note