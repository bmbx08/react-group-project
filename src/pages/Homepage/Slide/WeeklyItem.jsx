import React, { useState } from 'react'
import './WeeklyItem.style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const WeeklyItem = (props) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,

        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,

        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,

        }
    };
    return (
        <div className='weeklyItem' style={{ marginBottom: '10vw' }}>
            <h3>Weekly Best</h3>
            <Carousel
                centerMode={false} //가운데 정렬
                responsive={responsive}
                infinite={true} //무한반복
                autoPlay={props.deviceType !== "mobile"} // 자동 재생 (모바일 제외)
                autoPlaySpeed={4000} // 4초마다 자동으로 넘김
                // keyBoardControl={true} //키보드로 이동
                containerClass="carousel-container" //스타일
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]} //화살표 버튼 숨기기
                itemClass="item-slider p-1" //스타일
            >
                {Array(12).fill(null).map((_, index) => (
                    <div key={index} style={{ padding: '0 3rem' }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img className='itemImg' style={{ width: '25.875rem', height: '33.6rem' }} src={hoveredIndex === index
                            ? 'https://img2.quasarzone.com/editor/2022/04/08/5a00d5596f036cddcd0a1ecb0551cc3b.jpg' // Replace with the hover image URL
                            : 'https://img2.quasarzone.com/editor/2022/04/08/7bc7f6fc5a465071888ffd5702b0b459.jpg'} // Replace with the default image URL
                            alt='product' />
                        <div style={{ marginTop: '1rem' }}>상품 제목</div>
                        <div style={{ marginTop: '0.5rem' }}>상품 가격</div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default WeeklyItem