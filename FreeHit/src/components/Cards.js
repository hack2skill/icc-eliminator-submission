import React from 'react'

const Cards = (props) => {
    const data = props.data;
    // console.log(data)
    return (
        <div className="max-w-sm h-40 mt-5 mx-auto rounded bg-white overflow-hidden shadow-lg">
            {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
            <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2">
                    <div className='flex flex-row'>
                        <img className='h-5 my-auto' crossorigin="anonymous" src={`https://countryflagsapi.com/png/${data.HomeTeam}`} alt="" />
                        <span className='ml-2'>{data.HomeTeam}</span>
                    </div>
                    <div className='flex flex-row'>
                        <img className='h-5 my-auto' crossorigin="anonymous" src={`https://countryflagsapi.com/png/${data.AwayTeam}`} alt="" />
                        <span className='ml-2'>{data.AwayTeam}</span>
                    </div>
                </div>
                <p className="text-gray-700 text-base">
                    {data.Location}
                </p>
            </div>
            <div className="px-6 pb-2">
                <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{new Date(data.DateUtc).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}</span>
            </div>
        </div>

    )
}

export default Cards