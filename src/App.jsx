import React, { useRef, useState } from "react";
import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoIosAdd } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const cursorRef = useRef(null);
  const mainRef = useRef(null);
  const bigtext = useRef(null);
  const headingref = useRef();
  const growcanvas = useRef(null);
  const navtop = useRef(null);
  const [showCanvas, setshowCanvas] = useState(false)

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
   
  },);

  useEffect(() => {
    const handleClick = (e) => {
      setshowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growcanvas.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 2,
            ease: "power2.inOut",
          });

          gsap.to(growcanvas.current, {
            scale: 1000,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growcanvas.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });

        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);


  useGSAP(() => {
    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        duration: 1,
        x: e.clientX-9,
        y: e.clientY-9,
        ease: "back.out(1.4)",
      });
    };
     const mainEl = mainRef.current;
    mainEl.addEventListener("mousemove", handleMouseMove);


    const entermouse = () => {
      if (!cursorRef.current.querySelector("img")) {
        const img = document.createElement("img");
        img.src = "https://thirtysixstudio.com/peppers/pepperA/140.png"; // Replace with your image path
        img.style.width = "100%";
        img.style.height = "100%";
        cursorRef.current.appendChild(img);
      }
      gsap.to(cursorRef.current, {
       scale: 4,
     width: "20px",
     height: "20px",
     duration: 0.3,
      });
    }
     const bigtext1 = bigtext.current;
      bigtext1.addEventListener("mouseenter", entermouse);


      const removemouse = () => {
        const img = cursorRef.current.querySelector("img");
  if (img) {
    cursorRef.current.removeChild(img);
  }
        gsap.to(cursorRef.current, {
       width: "5px",
       height: "5px",
       duration: 0.3,
        });
      }
      
       const bigtext2 = bigtext.current;
        bigtext2.addEventListener("mouseleave", removemouse);
  });


  useGSAP(() => {
    gsap.from(".textmid div", {
      y: 100,
      opacity: 0,
      duration: 2,
      stagger: -1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".textmid",
        start: "top 70%",
        end: "top 40%",
        scrub: true,
      },
    });
  });

  return (
    <>
      <main ref={mainRef} className="min-h-screen pb-10">
    {!showCanvas && <div ref={cursorRef} className="w-5 h-5 bg-[#fd2c2a] flex justify-center items-center rounded-full z-10 fixed"></div>}
    {showCanvas && <div ref={cursorRef} className="w-5 h-5 bg-white flex justify-center items-center rounded-full z-10 fixed"></div>}
    <span ref={growcanvas} className="w-1 h-1 block fixed bg-[#fd2c2a] rounded-3xl top-[-10px] left-0"></span>
        <nav ref={navtop} className="fixed backdrop-blur-md top-0 left-0 right-0 shadow-lg z-50">
          <div className="px-6 mx-auto ">
            <div className="flex items-center border-b-white justify-between h-16">
              <div className="">Thirtysixstudio</div>
              <div className="hidden md:block">
                <ul className="flex space-x-4">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-600 px-3 py-2 rounded-md text-sm "
                    >
                      What we do
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-600 px-3 py-2 rounded-md text-sm "
                    >
                      Who we are
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-600 px-3 py-2 rounded-md text-sm "
                    >
                      How we give back
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-600 px-3 py-2 rounded-md text-sm "
                    >
                      Talk to us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="h-[0.2px] w-full bg-gray-800"></div>

        <div className='w-full min-h-screen relative'>
    {showCanvas && data[0].map((canvasdata, index)=>(
      <Canvas key={index} details={canvasdata} />
    ))}
    </div>

    <div className='w-full min-h-screen relative'>
    {showCanvas && data[1].map((canvasdata, index)=>(
      <Canvas key={index} details={canvasdata} />
    ))}
    </div>

    <div className='w-full min-h-screen relative'>
    {showCanvas && data[2].map((canvasdata, index)=>(
      <Canvas key={index} details={canvasdata} />
    ))}
    </div>

    <div className='w-full min-h-screen relative'>
    {showCanvas && data[2].map((canvasdata, index)=>(
      <Canvas key={index} details={canvasdata} />
    ))}
    </div>

    <div className='w-full min-h-screen relative'>
    {showCanvas && data[4].map((canvasdata, index)=>(
      <Canvas key={index} details={canvasdata} />
    ))}
    </div>

    <div className='w-full min-h-screen relative'>
    {showCanvas && data[2].map((canvasdata, index)=>(
      <Canvas key={index} details={canvasdata} />
    ))}
    </div>

        <div className=" absolute top-0 w-full pb-4 justify-center pt-20">
          <div className="flex flex-col md:flex-row mx-auto h-fit justify-between w-full max-w-6xl">
            {/* Left Section */}
            <div className="flex-1 pl-30">
              <h3 className="text-2xl leading-none md:text-4xl mb-6">
                At Thirtysixstudio, we
                <br />
                build <span>digital assets</span> and
                <br />
                <span>immersive experiences</span>
                <br />
                for purposeful brands.
              </h3>
              <p className="leading-tight max-w-[350px] mb-10">
                We're a boutique production studio focused on design, animation,
                and technology, constantly rethinking what digital craft can do
                for present-day ads and campaigns.
              </p>
              <p>Scroll</p>
            </div>

            {/* Right Section (Circle Text) */}
            <div className="flex-1 flex justify-center mt-0 md:mt-25 relative">
              <div className="w-44 h-44 rounded-full border-2 border-white flex items-center justify-center relative">
                <p className="text-center text-sm rotate-text">
                  DIGITAL PRODUCTION — THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL
                </p>
              </div>
            </div>
          </div>

          <div ref={bigtext} className="w-fill mt-[100px] relative">
            <div ref={headingref} className="overlay h-[100%] w-[100%] cursor-pointer absolute z-20"></div>
            <h1 className="text-[14.5rem] text-center">Thirtysixstudio</h1>
          </div>

          <div className="h-[0.2px] w-full bg-gray-900"></div>

          <div className="flex flex-col md:flex-row mx-auto py-25 mb-[100px] h-fit justify-between w-full max-w-6xl">
            {/* Left Section */}
            <div className="flex-1 pl-30">
              <h3 className="font-mono md:text-xl mb-6">01 -- WHAT WE DO</h3>
            </div>

            {/* Right Section (Circle Text) */}
            <div className="flex-1 flex flex-col justify-center mt-0  relative">
              <p className=" text-4xl font-[10px] w-[350px]">
                We aim to elevate digital production in the advertising space,
                bringing your ideas to life.
              </p>

              <p className="font-light mt-[150px] w-[400px]">
                As a contemporary studio, we use cutting-edge design practices
                and the latest technologies to deliver current digital work.
                <br />
                <br />
                Our commitment to innovation and simplicity, paired with our
                agile approach, ensures your journey with us is smooth and
                enjoyable from start to finish.
              </p>
            </div>
          </div>

          <div className="h-[0.2px] w-full bg-gray-800"></div>

          <div className=" w-full">
            <div className="w-[900px] py-[110px] m-auto">
              <p className="font-mono">OUR SERVICES</p>
              <p
                className="overflow-hidden textmid text-4xl mt-20 font-[10px]">
                <div>We provide you with captivating design, interactive</div>
                <div>Animations, reliable code, and immaculate projects</div>
                <div>Coordination Whether you need a campaign built from</div>
                <div>
                  Scratch or assistance at a specific phase, we've got vou
                </div>
                <div>covered.</div>
              </p>
            </div>

            <div className="h-[0.2px] w-full bg-gray-900"></div>

            <div className="w-full py-[100px]">
              <img
                className="w-[90vw]  h-[80vh]  rounded-3xl mx-auto  object-cover"
                src="https://img.freepik.com/premium-photo/dark-shadows-evergreen-forest-beautiful-gree-natural-forest-background-landscape_636537-392231.jpg"
                alt=""
              />

              <div className="w-full mt-[150px] px-6 py-5">
                <div>
                  <div className="flex items-center justify-around py-5">
                    <div className="w-[50%] flex justify-center items-center">
                      <p className="font-mono w-[50%]">CREATIVE</p>
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                      <div className="py-1 px-3 rounded-3xl border border-gray-900 hover:border-gray-700  cursor-pointer">
                        <IoIosAdd className="text-[25px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[0.2px] w-full bg-gray-700"></div>
                </div>

                <div>
                  <div className="flex items-center justify-around py-5">
                    <div className="w-[50%] flex justify-center items-center">
                      <p className="font-mono w-[50%]">DESIGN</p>
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                      <div className="py-1 px-3 rounded-3xl border border-gray-900 hover:border-gray-700  cursor-pointer">
                        <IoIosAdd className="text-[25px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[0.2px] w-full bg-gray-700"></div>
                </div>

                <div>
                  <div className="flex items-center justify-around py-5">
                    <div className="w-[50%] flex justify-center items-center">
                      <p className="font-mono w-[50%]">ANIMATION</p>
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                      <div className="py-1 px-3 rounded-3xl border border-gray-900 hover:border-gray-700  cursor-pointer">
                        <IoIosAdd className="text-[25px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[0.2px] w-full bg-gray-700"></div>
                </div>

                <div>
                  <div className="flex items-center justify-around py-5">
                    <div className="w-[50%] flex justify-center items-center">
                      <p className="font-mono w-[50%]">TECHNOLOGY</p>
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                      <div className="py-1 px-3 rounded-3xl border border-gray-900 hover:border-gray-700  cursor-pointer">
                        <IoIosAdd className="text-[25px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[0.2px] w-full bg-gray-700"></div>
                </div>

                <div>
                  <div className="flex items-center justify-around py-5">
                    <div className="w-[50%] flex justify-center items-center">
                      <p className="font-mono w-[50%]">PROJECT DELIVERY</p>
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                      <div className="py-1 px-3 rounded-3xl border border-gray-900 hover:border-gray-700  cursor-pointer">
                        <IoIosAdd className="text-[25px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[0.2px] w-full bg-gray-700"></div>
                </div>

                <div>
                  <div className="flex items-center justify-around py-5">
                    <div className="w-[50%] flex justify-center items-center">
                      <p className="font-mono w-[50%]">EXAMPLE PRODUCTS</p>
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                      <div className="py-1 px-3 rounded-3xl border border-gray-900 hover:border-gray-700 cursor-pointer">
                        <IoIosAdd className="text-[25px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[0.2px] w-full bg-gray-700"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-around py-5  mb-[200px]">
                <div className="w-[50%] flex flex-col justify-center items-center">
                <div className="w-[400px]">
                  <p className=" text-[15px]">
                    Got a project in mind? Drop us a line at
                    hello@thirtysixstudio.com or use the form below.
                    <br />
                    <br />
                    Not sure what you need? We’re here to help you define the
                    undefined. Let’s explore all creative and technical
                    possibilities together through one of our tailored labs,
                    where we champion future-forward thinking within an ethical
                    framework.
                  </p>
                  <button className=" mt-7 text-[12px] py-2 px-8 border underline border-gray-400 rounded-3xl cursor-pointer hover:text-black hover:bg-white">TALK TO US</button>
                  </div>
                </div>
                <div className="w-[50%] flex justify-center items-center"></div>
              </div>
            </div>

            <div className="h-[0.2px] w-full bg-gray-800"></div>

            <div className="flex flex-col md:flex-row mx-auto py-25 h-fit justify-between w-full max-w-6xl">
            {/* Left Section */}
            <div className="flex-1 pl-30">
              <h3 className="font-mono md:text-xl mb-6">01 -- WHAT WE DO</h3>
            </div>

            {/* Right Section (Circle Text) */}
            <div className="flex-1 flex flex-col justify-center mt-0  relative">
              <p className=" text-4xl font-[10px] w-[350px]">
                We aim to elevate digital production in the advertising space,
                bringing your ideas to life.
              </p>
            </div>
          </div>


          </div>
        </div>
      </main>
    </>
  );
};
export default App;
