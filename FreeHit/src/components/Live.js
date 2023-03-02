import React, { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Live = () => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const links = [
    "https://www.youtube.com/embed/X7QRKdw-sTQ?autoplay=1",
    "https://www.youtube.com/embed/eYPaIoocfnE?autoplay=1",
    "https://www.youtube.com/embed/nv1MQ_en2rQ?autoplay=1",
    "https://www.youtube.com/embed/cmK3FUFgIfk?autoplay=1"
  ]
  const [currentAngle, setCurrentAngle] = useState(2);
  return (
    <>
      <h1 className='text-white text-center  text-2xl my-10'>Live Match</h1>
      <div className='flex flex-col md:flex-row justify-center mb-52'>
        <iframe className='' width="885" height="498" src={links[currentAngle % 4]} title="Video" frameborder="0"  allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen autoplay>
        </iframe>
        <div className='self-end'>
          {/* <button onClick={() => setCurrentAngle(currentAngle + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold -ml-40 mb-5 py-2 px-4 rounded'>Change Angle</button> */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold -ml-40 mb-5 py-2 px-4 rounded">
                Options
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <p
                      onClick={() => setCurrentAngle(1)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Stands
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                      onClick={() => setCurrentAngle(2)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Main
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => setCurrentAngle(3)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Commentary
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                      onClick={() => setCurrentAngle(0)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Audience
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

      </div>

    </>

  )
}

export default Live