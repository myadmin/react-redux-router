import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, NavBar } from 'antd-mobile';
import { increasement, decreasement, odd_increasement, async_add } from './redux';
import Box from './Box';

@connect(
    state => state.todoApp,
    {increasement, decreasement, odd_increasement, async_add}
)

class App extends Component {
    render () {
        return (
            <div>
                {/* <div>
                    <p onClick={() => this.props.add()}>点我加一</p>
                    <p onClick={() => this.props.reduce()}>点我减一</p>
                    <p onClick={() => this.props.odd_add()}>点我奇数加一</p>
                    <p onClick={() => this.props.async_add()}>点我异步加一</p>
                </div> */}
                <div>
                    <NavBar>{this.props.num}</NavBar>
                    <Button onClick={() => this.props.increasement()}>点我加一</Button>
                    <Button onClick={() => this.props.decreasement()}>点我减一</Button>
                    <Button onClick={() => this.props.odd_increasement()}>点我奇数加一</Button>
                    <Button onClick={() => this.props.async_add()}>点我异步加一</Button>
                </div>
                <Box />
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     const { num } = state.todoApp
//     return {
//         num: num
//     }
// }
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         add: () => {
//             dispatch(increasement())
//         },
//         reduce: () => {
//             dispatch(decreasement())
//         },
//         odd_add: () => {
//             dispatch(odd_increasement())
//         },
//         async_add: () => {
//             dispatch(async_add())
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App
