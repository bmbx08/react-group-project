import React, { useState, useEffect } from 'react'
import './Banner.style.css'
import banner1 from "../../../common/images/banner/banner.jpg"
import banner2 from "../../../common/images/banner/banner2.jpg"
import banner3 from "../../../common/images/banner/banner3.jpg"

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        banner1,banner2,banner3,
        'https://ih1.redbubble.net/image.1108696597.9907/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg',
        // 'https://s14354.pcdn.co/wp-content/uploads/2019/02/clark-street-mercantile-33919-unsplash-768x549.jpg',
    ]

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // 5초마다 슬라이드 변경

        return () => clearInterval(slideInterval); // 컴포넌트 언마운트 시 interval 정리
    }, [slides.length]);



    return (
        <div className="slider">
            <div className='slides'>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide})` }}
                    >
                    </div>
                ))}
            </div>
            <div className="progress-bars">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`progress-bar ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Banner