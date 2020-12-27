import { List, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from '../api/api';

const Cartoons = ({ search, setSearch }) => {
    const [showList, setShowList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSearch("");
        API
            .get(`/showList?genre=cartoon-list`)
            .then(res => {
                setShowList(res.data.result);
                setSearchList(res.data.result);
                setLoading(false);
            })
        return () => {
            
        };
    }, []);

    useEffect(() => {
        const result = showList.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        setSearchList(result);
        return () => {
                
        };
    }, [search])
    
    return (
        <div>
            { loading ? 
                <div style={{margin:"22%"}}>
                    <Spin />
                </div> : 
                
                <div>
                    <List
                        style={{backgroundColor:"white"}}
                        bordered
                        dataSource={search !== "" ? searchList : showList}
                        renderItem={item => (
                            <List.Item>
                                <Link to={`/show/${item.link.split("https://www.wcostream.com/")[1].split("anime/")[1]}`}>
                                    {item.title}
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            }
        </div>
    )
}

export default Cartoons
