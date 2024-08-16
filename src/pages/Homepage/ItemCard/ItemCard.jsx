import React from 'react'
import './ItemCard.style.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from "@tanstack/react-query";
import { useData } from '../../../hooks/useData';
import ProductCard from '../ProductCard/ProductCard';

const ItemCard = () => {
    const { data, isLoading, isError, error } = useData();
    console.log("data", data, isLoading);
    console.log("error", isError, error);

    useQuery({});
    return (
        <div className='itemcard' style={{ marginTop: '15rem' }}>
            <h5>NEW ARRIVALS</h5>
            <Container>
                <Row>
                    {data?.items?.map((item, index) => (
                        <Col md={3} sm={12} key={index}>
                            <ProductCard item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default ItemCard