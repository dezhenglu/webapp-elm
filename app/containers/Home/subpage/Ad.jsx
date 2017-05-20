import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getAdData } from '../../../fetch/home/home.js'
import HomeAd from '../../../components/HomeAd/index.jsx'
 
class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [] 
            // data: [
            //     {
            //         title: '暑假5折',
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191639092-2000037796.png',
            //         link: 'https://github.com/dezhenglu/'
            //     },
            //     {
            //         title: '特价出国',
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191648124-298129318.png',
            //         link: 'https://github.com/dezhenglu/'
            //     },
            //     {
            //         title: '亮亮车',
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191653983-1962772127.png',
            //         link: 'https://github.com/dezhenglu/'
            //     },
            //     {
            //         title: '学钢琴',
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191700420-1584459466.png',
            //         link: 'https://github.com/dezhenglu/'
            //     },
            //     {
            //         title: '电影',
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191706733-367929553.png',
            //         link: 'https://github.com/dezhenglu/'
            //     },
            //     {
            //         title: '旅游热线',
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191713186-495002222.png',
            //         link: 'https://github.com/dezhenglu/'
            //     }
            // ]
        };
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length
                    ? <HomeAd data={ this.state.data }/>
                    : <div>加载中...</div>
                }
            </div>
        )
    }
    componentDidMount() {
        const result = getAdData();
        result.then((res) => {
            return res.json()
        }).then((json) => {
            const data = json
            if(data.length) {
                this.setState({
                    data: data 
                });
            }
        })
    }
}


export default Ad
