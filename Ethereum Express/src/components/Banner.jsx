
import { GiAmericanFootballHelmet,GiCrossedChains } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import banner from "../assets/banner.png"
const Banner = () => {
  return (
    <>
      <div
      className="flex flex-col lg:flex-row justify-center lg:justify-between  
      items-center lg:space-x-10 md:w-2/3 w-full p-5 mx-auto container rounded mt-3"
    >
      <img className="mb-5 lg:mb-0 w-1/2" src="https://media.istockphoto.com/id/512279160/vector/batsman-playing-cricket-championship.jpg?s=612x612&w=0&k=20&c=TRIf8pSr_XQIH3doMlsvpj16eNzx3_b9ys4ie_B-4Z0=" alt="banner" />
      <div className="flex flex-col justify-between  items-start lg:items-center text-center lg:text-left">
        <div className="flex flex-col space-y-4 mb-5">
          <h4 className="text-3xl font-bold"> <GiAmericanFootballHelmet size={100} className="cursor-pointer"/> Welcome to <br/> <span className='text-blue-500 font-extrabold'>Ethereum Express</span></h4>
          <p className="text-gray-500">
          Tracking every step, securing every link ,
          The power of blockchain for your supply chain.
          
          </p>
          <p className=' text-black font-bold'>Secure your products with Ethereum Express (Helmet)  </p>
        </div>
        <div className="flex justify-start text-center items-center space-x-2 mx-auto lg:ml-0">
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
                leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
                focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
                active:shadow-lg transition duration-150 ease-in-out"
          >
            <Link to="/shopping">Let's Go</Link>
          </button>
        </div>
      </div>
    </div>
    <div
      className="flex flex-col lg:flex-row justify-center lg:justify-between  
      items-center lg:space-x-10 md:w-2/3 w-full p-5 mx-auto container rounded mt-"
    >
      
      <div className="flex flex-col justify-between  items-start lg:items-center text-center lg:text-left">
        <div className="flex flex-col space-y-4 mb-5">
          <h4 className="text-3xl font-bold"> <GiCrossedChains size={100} className="cursor-pointer"/> Track Your Orders With <br/> <span className='text-blue-500 font-extrabold'>Ethereum Express</span></h4>
          <p className="text-gray-500">
          Tracking every step, securing every link ,
          The power of blockchain for your supply chain.
          
          </p>
          
        </div>
        <div className="flex justify-start text-center items-center space-x-2 mx-auto lg:ml-0">
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
                leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
                focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
                active:shadow-lg transition duration-150 ease-in-out"
          >
            <Link to="/chain">See Track Chain</Link>
          </button>
        </div>
      </div>
      <img className="mb-5 lg:mb-0 w-1/2" src={banner} alt="banner" />
    </div>

    </>  )
}

export default Banner
