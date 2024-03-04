"use client"
import { useEffect, useState } from 'react';

type Movie = {
    _id: string;
    year: number;
    aceYear: string;
    Branch: string;
    CCode: string;
    CName: string;
    ExpNo: number;
    ExpName: string;
    ExpDesc: string;
    ExpSoln: string;
};

const ExperimentPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [experiments, setExperiments] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();

                console.log(jsonData)
                // setExperiments(jsonData.results); 
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Experiments</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {experiments.map((experiment) => (
                        <li key={experiment._id}>
                            <h2>{experiment.ExpName}</h2>
                            <p>{experiment.ExpDesc}</p>
                            <pre>{experiment.ExpSoln}</pre>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExperimentPage;