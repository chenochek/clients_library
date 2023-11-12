import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Flex, List, Skeleton} from 'antd';
import ListType from "../types/listType";
import DeleteBtn from "./DeleteBtn";



const ListCustom: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ListType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
            <div
                id="scrollableDiv"
                style={{
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    width: 500
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.email} extra={<DeleteBtn/>}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{"Иванов Иван Иванович"}</a>}
                                    description="+375297051388"
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
    );
};

export default ListCustom;