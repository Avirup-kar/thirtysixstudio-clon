import { useEffect,useState, useRef } from "react"
import canvasimages from "./canvasimages"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const canvas = ({ details }) => {

const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [index, setindex] = useState({ value: startIndex })
  const canvasref = useRef()

  useGSAP(()=>{
    gsap.to(index, {
        value:startIndex + numImages -1,
        duration:duration,
        repeat:-1,
        ease:"linear",
        onUpdate: ()=>{
             setindex({ value:Math.round(index.value) })
        }
    })


    gsap.from(canvasref.current, {
      opacity: 0,
      duration: 1,
      case: "power2.inOut",
     })

  })

   useEffect(()=>{
    const canvas = canvasref.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = canvasimages[index.value];
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
   })
  return (
    <canvas ref={canvasref} 
    data-scroll
    data-scroll-speed={Math.random().toFixed(1)}
    className="absolute" 
    style={{
    width:`${size*1.4}px`,
    hight:`${size*1.4}px`,
    top: `${top}%`,
    left: `${left}%`,
    zIndex: `${zIndex}`,
    }} id="canvas">

    </canvas>
  )
}

export default canvas
