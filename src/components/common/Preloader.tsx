import React from "react"
import spin from "../../assets/images/spin.svg"


let Preloader: React.FC = () => {
  return (
    <div>
      <img src={spin} alt="preloader"/>
    </div>
  )
 }

export default Preloader
