import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore
                    ? <span>加载中...</span>
                    : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle() {
        this.props.loadMoreDataFn()
    }
    componentDidMount() {

        const loadMoreFn = this.props.loadMoreDataFn
        const wrapper = this.refs.wrapper
        console.log(wrapper)
        let timeoutId
        const callback = function () {
            const top = wrapper.getBoundingClientRect().top
            const windowHeight = window.screen.height
            //console.log(top+' '+windowHeight)
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }
        window.addEventListener('scroll', function() {
            if (this.props.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 100); // 截流
        }.bind(this),false)
    }   
    // componentWillMount(){
    //     console.log('Component WILL MOUNT!')
    // }
    // componentDidMount(){
    //     console.log('Component DID MOUNT!')
    // }
    // componentWillReceiveProps(newProps) {
    //     console.log('Component WILL RECEIVE PROPS!')
    // }
    // // shouldComponentUpdate(newProps, newState) {
    // //       return true;
    // // }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('Component WILL UPDATE!');
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('Component DID UPDATE!')
    // }
    // componentWillUnmount() {
    //     console.log('Component WILL UNMOUNT!')
    // }
}

export default LoadMore
