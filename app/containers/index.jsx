import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo' 

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone 
                    ? this.props.children 
                    : <div>正在加载...</div>
                }
            </div>
        )
    }
    componentDidMount() {

        // 从localstoreage里获取城市
        let cityName = LocalStore.getItem(CITYNAME)
        if(cityName == null) {            
            cityName = '沈阳'            
        }
        console.log(cityName)
        // 将城市信息存储到 Redux 中
        this.props.userInfoActions.update({
            cityName: cityName
        });

        // 更改状态
        this.setState({
            initDone: true
        });     

        // var that = this
        // setTimeout(function (){
        //     that.setState({
        //         initDone: true
        //     })
        // },1000)
        // ES6 箭头函数
        // setTimeout(() => {
        //     this.setState({
        //         initDone: true
        //     });
        // },1000);
    }   

}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
// export default App
