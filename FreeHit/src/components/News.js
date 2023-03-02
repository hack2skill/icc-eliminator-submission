import React from 'react'
import { cricket } from '../constants/cricket'
const News = () => {
    const data = cricket[0].articles;
    console.log(data)
    return (
        <>
            <h1 className='text-white text-center  text-2xl my-10'>Latest news</h1>
            <div class="p-2 w-3/4 mx-auto mb-10">
                <div class="grid grid-cols-3  grid-flow-row grid-">
                    <div class="p-5 rounded-md text-center row-start-1 row-end-4 col-start-1 col-end-3">
                        <img class="w-full" src={data[0].urlToImage} alt="Sunset in the mountains" />
                        <div class="px-6 py-4">
                            <div class="text-white font-bold text-xl mb-2">{data[0].title}</div>
                        </div>
                    </div>
                    <div class="p-5 text-center col-start-3 col-end-4">
                        <img class="w-full" src={data[1].urlToImage} alt="Sunset in the mountains" />
                        <div class="rounded-sm">
                            <div class="font-bold text-white text-xl mb-2">{data[1].title}</div>
                        </div>
                    </div>
                    <div class="p-5 text-center col-start-3 col-end-4">
                        <img class="w-full" src={data[2].urlToImage} alt="Sunset in the mountains" />
                        <div class="rounded-sm">
                            <div class="font-bold text-white text-xl mb-2">{data[2].title}</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default News