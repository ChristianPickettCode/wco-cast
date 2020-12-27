import { Button, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react'
import API from '../api/api';

const Episode = ({ setSearch }) => {
    const [url, setUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState();
    useEffect(() => {
        setSearch("");
        const title = window.location.pathname.split("/ep/")[1];
        setName(title);
        API
            .get(`/showUrl?title=${title}&id=frameNewcizgifilmuploads0`)
            .then(res => {
                setUrl(res.data.url);
                setLoading(false);
            })
            .catch(err => {
                API
                    .get(`/showUrl?title=${title}&id=frameNewAnimeuploads0`)
                    .then(res => {
                        setUrl(res.data.url);
                        setLoading(false);
                    })
                    .catch(err => message.error("an error occured please refresh."));
            });
        return () => {
            
        };
    }, []);
    
    return (
        <div>
            { loading ? 
                <div style={{margin:"10%"}}>
                    <Spin />
                </div> : 
                
                <div style={{marginTop:"10%"}}>
                    <p>{name.replaceAll("-", " ")}</p>
                    <Button type="primary"><a target="blank" href={url}>Click to watch</a></Button>
                </div>
            }
        </div>
    )
}

export default Episode
