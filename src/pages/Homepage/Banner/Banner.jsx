import React, { useState, useEffect } from 'react'
import './Banner.style.css'

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        'https://img2.quasarzone.com/editor/2022/04/08/ecbd2b60ec7ea4b44cbdbfeee980b8c9.jpg',
        'https://img2.quasarzone.com/editor/2022/04/08/37198caa7179edfad4a669332d930390.jpg',
        'https://img2.quasarzone.com/editor/2022/04/08/acd75a48616fecb3dcb8eb7e19c4bf1f.jpg',
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