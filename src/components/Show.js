import { List, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from '../api/api';

const Show = ({ search, setSearch }) => {
    const [showList, setShowList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSearch("");
        const title = window.location.pathname.split("/show/")[1];
        API
            .get(`/episodeList?genre=anime&title=${title}`)
            .then(res => {
                setShowList(res.data.result);
                setSearchList(res.data.result);
                setLoading(false);
            })
        return () => {
            
        };
    }, []);

    useEffect(() => {
        const result = showList.filter(item => item.title.toLowerCase().includes(search));
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
                                <Link to={`/ep/${item.link.split("https://www.wcostream.com/")[1]}`}>
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

export default Show
