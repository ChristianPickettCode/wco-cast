import { Layout, PageHeader, Button , Input, Divider} from 'antd'
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Cartoons from './Cartoons';
import Dubbed from './Dubbed';
import Episode from './Episode';
import Show from './Show';
import Subbed from './Subbed';

const { Content } = Layout;
const { Search } = Input;

const Stream = () => {
    const [search, setSearch] = useState("");

    return (
        <Layout style={{ height: "100%", width: "100%" }}>
            <PageHeader 
                title={<Link to="/"><h3 style={{ margin:"0" }}>"wcocast"</h3></Link>}
                extra={[
                    <Button key="/dubbed"><Link to="/dubbed">Dubbed</Link></Button>,
                    <Button key="/subbed" ><Link to="/subbed">Subbed</Link></Button>,
                    <Button key="/cartoons" ><Link to="/cartoons">Cartoons</Link></Button>,
                ]}
            />
            
            <Content style={{ margin:"0% auto 2% auto"}}>
                
                <Switch>
                    <Route path="/ep/:title">
                        <Content style={{ margin:"auto", overflow:"scroll", height:"500px", width:"250px" }}>
                            <Episode setSearch={setSearch} />
                        </Content>
                    </Route>
                    <Route path="/show/:title">
                        <Search value={search} placeholder="search..." enterButton onChange={e => setSearch(e.target.value)} onSearch={setSearch} />
                        <Divider />
                        <Content style={{ margin:"auto", overflow:"scroll", height:"500px" }}>
                            <Show search={search} setSearch={setSearch} />
                        </Content>
                    </Route>
                    <Route path="/dubbed">
                        <Search value={search} placeholder="search..." enterButton onChange={e => setSearch(e.target.value)} onSearch={setSearch} />
                        <Divider />
                        <Content style={{ margin:"auto", overflow:"scroll", height:"500px" }}>
                            <Dubbed search={search} setSearch={setSearch}/>
                        </Content>
                    </Route>
                    <Route path="/subbed">
                        <Search value={search} placeholder="search..." enterButton onChange={e => setSearch(e.target.value)} onSearch={setSearch} />
                        <Divider />
                        <Content style={{  margin:"auto", overflow:"scroll", height:"500px" }}>
                            <Subbed search={search} setSearch={setSearch}/>
                        </Content>
                    </Route>
                    <Route path="/cartoons">
                        <Search value={search} placeholder="search..." enterButton onChange={e => setSearch(e.target.value)} onSearch={setSearch} />
                        <Divider />
                        <Content style={{  margin:"auto", overflow:"scroll", height:"500px" }}>
                            <Cartoons search={search} setSearch={setSearch}/>
                        </Content>
                    </Route>
                    <Route exact path="/">
                        <Content style={{  margin:"auto", overflow:"scroll", height:"500px" }}>
                            <p>watch anime and cartoons online.</p>
                        </Content>
                    </Route>
                </Switch>
            </Content>
        </Layout>
    )
}

export default Stream
