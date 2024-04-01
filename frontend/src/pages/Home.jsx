import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import backgroundImage from '../../images/bookimage.jpg';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);
    return (
        <div 
        className='p-4'
        style={{
            backgroundImage: `linear-gradient(rgba(0, 0 , 0, 0.8), rgba(0, 0 , 0, 0.8)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        >
            <div className='flex justify-end items-center gap-x-4'>
                <button
                    className='bg-white bg-opacity-50 hover:bg-white px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}
                >
                    Table View
                </button>
                <button
                    className='bg-white bg-opacity-50 hover:bg-white px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}
                >
                    Card View
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 text-white font-bold'>BookList</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-white opacity-50 text-4xl' />
                </Link>
            </div>
            {loading ? <Spinner /> : showType === 'table' ? ( <BooksTable books={books} />) : ( <BooksCard books={books} />)}
        </div>
    );
};

export default Home