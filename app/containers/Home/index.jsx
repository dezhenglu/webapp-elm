import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from '../../components/HomeHeader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Category from '../../components/Category'
import Ad from './subpage/Ad.jsx'
import List from './subpage/List.jsx'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <div style={{ marginTop: '49px' }}>
                    <Category/>
                    <div style={{ height: '15px' }}></div>
                    <Ad/>
                    <List cityName={this.props.userinfo.cityName}/>
                </div>
            </div>
        )
    }
}

// -------------------redux react 绑定--------------------
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
