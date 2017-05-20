import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List/index.jsx'
import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            // data: [
            //     {
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201638030-473660627.png',
            //         title: '汉堡大大',
            //         subTitle: '叫我汉堡大大，还你多彩口味',
            //         price: '28',
            //         distance: '120m',
            //         mumber: '389'
            //     },
            //     {
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201645858-1342445625.png',
            //         title: '北京开源饭店',
            //         subTitle: '[望京]自助晚餐',
            //         price: '98',
            //         distance: '140m',
            //         mumber: '689'
            //     },
            //     {
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201652952-1050532278.png',
            //         title: '服装定制',
            //         subTitle: '原价xx元，现价xx元，可修改一次',
            //         price: '1980',
            //         distance: '160',
            //         mumber: '106'
            //     },
            //     {
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201700186-1351787273.png',
            //         title: '婚纱摄影',
            //         subTitle: '免费试穿，拍照留念',
            //         price: '2899',
            //         distance: '160',
            //         mumber: '58'
            //     },
            //     {
            //         img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201708124-1116595594.png',
            //         title: '麻辣串串烧',
            //         subTitle: '双人免费套餐等你抢购',
            //         price: '0',
            //         distance: '160',
            //         mumber: '1426'
            //     }
            // ],
            hasMore: false
        };
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length 
                    ? <ListComponent data={this.state.data}/>
                    : <div>加载中...</div>
                }
                {/* loadmore */}
            </div>
        )
    }
    componentDidMount() {
        // 获取首页数据
        this.loadFirstPageData()
    }
    // 获取首屏数据
    loadFirstPageData() {
        const cityName = this.props.cityName
        const result = getListData(cityName, 0)
        // console.log(result)
        this.resultHandle(result)
    }
    // 数据处理
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            // console.log(json)
            const hasMore = json.hasMore
            const data = json.data
            // 存储
            this.setState({
                hasMore: hasMore,
                data: data 
            });
        })
    }
}


export default List
