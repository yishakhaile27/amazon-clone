import React from 'react';
import style from './Category.module.css'
import { categoryInfos } from './categoryFullInfo';
import { Link } from 'react-router-dom';

function Category() {
    return (
        <div className={style.category}>
            {categoryInfos.map((info, index) => (
                <Link key={index} to={`/category/${encodeURIComponent(info.name)}`}>
                    <div className={style.category_container}>
                        <span>
                            <h2>{info.title}</h2>
                        </span>
                        <img src={info.imgLink} alt={info.title} loading="lazy" />
                        <p>shop now</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Category;
