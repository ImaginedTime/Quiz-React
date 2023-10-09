import React, { useContext, useState } from 'react'
import '../styles/CategoryChoice.css'
import { QuizContext } from '../QuizContext';

import { ToastContainer} from 'react-toastify';
import createToast from '../utils/createToast'

import { Link } from 'react-router-dom'

export default function CategoryChoice() {

    let categories = require('../json/categories.json').trivia_categories;

    const handleCategoryChooseClick = (category) => {
        if (selectedCategory && selectedCategory.id === category.id) {
            setSelectedCategory(null);
            return;
        }
        setSelectedCategory(category);
    }


    const { selectedCategory, setSelectedCategory } = useContext(QuizContext);

    return (
        <div className='categories-container'>
            <h1>Choose a Category</h1>
            <div className='categories'>
                {categories.map((category) => {
                    return (
                        <button
                            key={category.id}
                            className={`category-button ${selectedCategory && selectedCategory.id == category.id && 'selected-category'}`}
                            onClick={() => handleCategoryChooseClick(category)}
                        >
                            {category.name}
                        </button>
                    )
                })}
            </div>

            {
                selectedCategory !== null ?
                    <Link to='/qparams'><button className='choose-button'> Choose </button></Link> :
                    <button className='choose-button' onClick={() => createToast('Please Choose A Category!')} > Choose </button>
            }

            <ToastContainer />
        </div>
    )
}
