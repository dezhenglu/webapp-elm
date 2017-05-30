import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage/SearchList.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const params = this.props.params
        return (
            <div>
                <SearchHeader keyword={params.keyword}/>
                <div style={{ marginTop: '49px' }}>
                    <SearchList 
                        cityName={this.props.userinfo.cityName} 
                        keyword={params.keyword}
                        category={params.category}/>
                </div>
            </div>
        )
    }
    componentDidMount() {
        
        // console.log(params)
        // console.log('category params: ' + params.category)
        // console.log('key params: ' + params.keyword)
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
)(Search)
