import { Button, Spin, message, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import API from '../api/api';

const Episode = ({ showList }) => {
    const [url, setUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [prevEp, setPrevEp] = useState();
    const [nextEp, setNextEp] = useState();
    const [ep, setEp] = useState();

    useEffect(() => {
        const params = window.location.pathname.split("/show/")[1].split("/");
        const title = params[0];
        const episode = params[1];
        setEp(episode);
        
        if (episode && showList.length > 0) {
            const list = showList;
            const currentIndex = list.findIndex(x => x.link.split("https://www.wcostream.com/")[1] === episode);
            if (currentIndex !== 0) {
                const n = list[currentIndex-1].link.split("https://www.wcostream.com/")[1];
                setNextEp(`/${title}/${n}`);
            }
            if (currentIndex !== list.length - 1) {
                const p = list[currentIndex+1].link.split("https://www.wcostream.com/")[1];
                setPrevEp(`/${title}/${p}`);
            }

            API
                .get(`/showUrl?title=${episode}&id=frameNewcizgifilmuploads0`)
                .then(res => {
                    setUrl(res.data.url);
                    setLoading(false);
                })
                .catch(err => {
                    API
                        .get(`/showUrl?title=${episode}&id=frameNewAnimeuploads0`)
                        .then(res => {
                            setUrl(res.data.url);
                            setLoading(false);
                        })
                        .catch(err => message.error("an error occured please refresh."));
                });
            
        }
        
        return () => {
            
        };
    }, [showList]);
    
    return (
        <div>
            { loading ? 
                <div>
                    <Spin />
                </div> : 
                
                <div style={{width:"50vw"}}>
                    <p>{ep.replaceAll("-", " ")}</p>
                    <Row justify="space-between">
                        { prevEp ? <Button><a href={`/show${prevEp}`}>Previous</a></Button> : <Button>Zero</Button>}
                        <Button type="primary"><a target="blank" href={url}>Click to watch</a></Button>
                        { nextEp ?  <Button><a href={`/show${nextEp}`}>Next</a></Button> : <Button>Final</Button>}
                    </Row>
                </div>
            }
        </div>
    )
}

export default Episode
