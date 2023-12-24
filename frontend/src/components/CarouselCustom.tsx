import React from 'react';
import {Alert, Carousel, Flex} from 'antd';
import {observer} from "mobx-react";

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const CarouselCustom: React.FC = observer(({slides, color, title}) => {
    return (
        <Flex vertical gap="small" style={{width: 500, marginRight:10, marginLeft: 10}}>
            <h3>{title}</h3>
        <Carousel >
            {slides.map((slide) => <div key={slide.id} style={{height: 150}}>
                    <Alert style={{height: 30,  backgroundColor: `${color}`, border: 'none', padding: 25}}  message={`${slide.fio}  ${slide.mobile || ''}`}/>
            </div>
            )}
        </Carousel>
        </Flex>
    );
});

export  {CarouselCustom};