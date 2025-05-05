import rank0 from "../assets/ranks/rank_0.svg";
import rank1 from "../assets/ranks/rank_1.svg";
import rank2 from "../assets/ranks/rank_2.svg";
import rank3 from "../assets/ranks/rank_3.svg";
import rank4 from "../assets/ranks/rank_4.svg";
import { useEffect, useState } from "react";

const KarmaSprint = () => {
    const [userData, setUserData] = useState([]);

    const getRankImage = (score) => {
        if (score <= 100) return rank0;
        if (score <= 499) return rank1;
        if (score <= 999) return rank2;
        if (score <= 4999) return rank3;
        return rank4;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const SHEET_ID = import.meta.env.VITE_ID; // Ensure this is set in your .env file
                const SHEET_NAME = 'Website Data'; // Update this to match your sheet name
                const SHEET_RANGE = 'A2:E1000'; // Updated range to match 5 columns
                
                const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const text = await response.text();
                const jsonString = text.substring(47).slice(0, -2);
                const data = JSON.parse(jsonString);
                
                if (!data.table || !data.table.rows) {
                    throw new Error('Invalid data format');
                }
                
                const transformedData = data.table.rows
                    .filter((row) => row.c && row.c[0])
                    .map((row) => ({
                        name: row.c[0]?.v || '',
                        level: Number(row.c[1]?.v) || 1,
                        karma_gained: Number(row.c[2]?.v) || 0,
                        referral_karma: Number(row.c[3]?.v) || 0,
                        points: Number(row.c[4]?.v) || 0
                    }));

                setUserData(transformedData);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
        }, []);

    // Descending sort.
    const sortedUsers = [...userData].sort((a, b) => b.points - a.points);

    return (
        <div className="min-h-screen w-full flex justify-center p-8 bg-[#0f0f0f] text-white relative overflow-hidden">
            <div className="w-full max-w-[1200px] flex flex-col gap-8 z-10">
                <h1 className="text-4xl font-bold text-center">µSprint Leaderboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedUsers.length > 0 ? (
                        sortedUsers.slice(0,30).map((data, index) => (
                            <div 
                                key={index} 
                                className={`bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-300 hover:scale-105 ${index < 10 ? 'border-2 border-yellow-500' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-xl font-bold text-yellow-400">{data.points} points</div>
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{data.name}</div>
                                            {data.karma_gained > 0 && (
                                                <div className="text-green-400 text-sm">
                                                    <span>↑</span> {data.karma_gained}ϰ
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Level {data.level} • Referral Karma: {data.referral_karma} ϰ
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img 
                                            src={getRankImage(data.points)} 
                                            alt={`Rank ${data.level}`}
                                            className="w-12 h-12"
                                        />
                                        <div className="mt-2 font-bold">
                                            #{index + 1}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">
                            <p>No data found</p>
                        </div>
                    )}
                </div>
                <div className="text-center text-gray-400 text-sm">
                    Last updated on: {new Date().toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default KarmaSprint;