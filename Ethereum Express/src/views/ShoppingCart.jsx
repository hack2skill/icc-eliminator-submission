import Cart from '../components/Cart'
import { useGlobalState } from '../store'
import { dummyData } from '../utils/dummyData'
const ShoppingCart = () => {
  // const [cart] = useGlobalState('cart')
  // const [summary] = useGlobalState('summary')

  return (
    <>
      <div className="h-10"></div>
      {dummyData.length > 0 ? (
        <Cart cart={dummyData} />
      ) : (
        <div className="flex flex-col justify-center items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
          <h4 className="text-center uppercase mb-8 font-extrabold text-2xl">Cart Empty</h4>
          <img src='http://img.cricinfo.com/SERIES/2001/IND_IN_ZIM/CONTEST/popup-batsman-new.gif' width={250}/>
        </div>
      )}
      
    </>
  )
}

export default ShoppingCart
