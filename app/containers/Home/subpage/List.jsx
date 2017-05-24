import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'
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
            hasMore: false, //记录当前状态下还有没有更多的数据可供加载
            isLoadingMore: false, //记录当前状态下，是’加载中...‘ 还是‘点击加载更多’
            page: 1 //下一页的页码


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
                {
                    this.state.hasMore
                    ? <LoadMore page={this.state.page} isLoadingMore={this.state.isLoadingMore} loadMoreDataFn={this.loadMoreData.bind(this)}/>
                    : ''
                }
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
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true
        },function() {
            const cityName = this.props.cityName
            const page = this.state.page //下一页的页码
            const result = getListData(cityName, page)
            this.resultHandle(
                result,
                function() {
                    this.setState({
                        page: page + 1,
                        isLoadingMore: false
                    });
                }
            )
        })       
    }
    // 数据处理
    resultHandle(result, callback) {
        result.then(res => {
            return res.json()
        }).then(json => {
            // console.log(json)
            const hasMore = json.hasMore
            const data = json.data
            // 存储
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            },callback);
        })
    }
}

export default List
