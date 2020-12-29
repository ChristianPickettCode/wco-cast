import { List, Spin, Layout, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom';
import API from '../api/api';
import Episode from './Episode';

const { Content } = Layout;
const { Search } = Input;

const Show = ({ search, setSearch }) => {
    const [showList, setShowList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTitle, setShowTitle] = useState();
    
    useEffect(() => {
        setSearch("");
        const params = window.location.pathname.split("/show/")[1].split("/");
        const title = params[0];
        setShowTitle(title);
        API
            .get(`/episodeList?genre=anime&title=${title}`)
            .then(res => {
                setShowList(res.data.result);
                setSearchList(res.data.result);
                setLoading(false);
            }).catch(err => console.log(err));
        
        return () => {
            
        };
    }, []);

    useEffect(() => {
        const result = showList.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        setSearchList(result);
        return () => {
                
        };
    }, [search]);
    
    return (
        <>
            <Route exact path="/show/:show/:title">
                <Episode showList={showList} />
            </Route>
            <Route exact path="/show/:show">
                <Search value={search} placeholder="search..." enterButton onChange={e => setSearch(e.target.value)} onSearch={setSearch} />
                <Content style={{ margin:"0% auto 2% auto"}}>
                    <Content style={{ margin:"auto", overflow:"scroll", height:"65vh", width:"70vw", textDecoration:"underline" }}>
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
                                            <Link to={`/show/${showTitle}/${item.link.split("https://www.wcostream.com/")[1]}`}>
                                                {item.title}
                                            </Link>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        }
                    </Content>
                </Content>
            </Route>
        </>
    )
}

export default Show
