import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductCard.style.css';

const ProductCard = ({ item }) => {

    const navigate = useNavigate()
    const showDetail = (id) => {
        navigate(`${id}`)
    }
    return (
        <div className='product-card' onClick={() => showDetail(item.id)}>
        <img src={item.image} alt={item.title} />
        <div className='overlay'>
            <div className='icon'>🛒</div> {/* 장바구니 아이콘 */}
            <div className='icon'>❤️</div> {/* 좋아요 아이콘 */}
            <div className='icon'>🔍</div> {/* 돋보기 아이콘 */}
        </div>
        <div>{item.title}</div>
    </div>
    )
}

export default ProductCard