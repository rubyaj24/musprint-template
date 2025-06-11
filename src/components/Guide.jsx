import React from 'react'

const Guide = () => {

    const ranks = [
        { name: 'Pioneer', color: '#cd7f32', image: '../src/assets/ranks/rank_1.svg', description: 'Achieve 100+ points' },
        { name: 'Warrior', color: '#c0c0c0', image: '../src/assets/ranks/rank_2.svg', description: 'Achieve 500+ points' },
        { name: 'Champion', color: '#ffd700', image: '../src/assets/ranks/rank_3.svg', description: 'Achieve 1000+ points' },
        { name: 'Legend', color: '#ff4500', image: '../src/assets/ranks/rank_4.svg', description: 'Achieve 5000+ points' },
    ]
return (
    <div className='flex flex-wrap justify-center items-center text-center p-4 text-white'>
        {ranks.map((rank) => (
            <div key={rank.name} style={{ color: rank.color }} className='rounded-lg p-4 m-2 shadow-lg bg-gray-900 flex flex-col items-center relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105'>
                <div 
                    className='absolute inset-0 -translate-x-full translate-y-full w-[400px] h-[100px] bg-gradient-to-br from-transparent via-white/20 to-transparent transform rotate-45 transition-transform duration-700 group-hover:translate-x-full group-hover:-translate-y-full'></div>
                <h3 className='text-lg font-semibold'>{rank.name}</h3>
                <img src={rank.image} alt={rank.name} className='h-24 p-2' />
                <p>{rank.description}</p>
            </div>
        ))}
    </div>
)
}

export default Guide