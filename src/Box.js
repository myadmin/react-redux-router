import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, WhiteSpace  } from 'antd-mobile';
import { getBookList } from './read.redux'
import { withRouter } from 'react-router-dom'

@connect(
    state => state.reader,
    { getBookList }
)
@withRouter

class Box extends Component {

    constructor (props) {
        super(props);

        this.state = {
            arr: []
        }
    }

    render () {
        // const data = Array.from(new Array(9)).map((_val, i) => ({
        //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        //     text: `name${i}`,
        // }));

        this.props.bookList ? Object.keys(this.props.bookList).map(v => {
            return this.state.arr.push(this.props.bookList[v]);
        }) : null;

        let data = [];

        this.state.arr.map(ele => {
            if (Array.isArray(ele)) {
                ele.map(v => data.push(v))
            }
        });

        data = data.map(v => ({
            icon: `http://statics.zhuishushenqi.com${v.bookCover[0]}`,
            text: v.name
        }));

        return (
            <div>
                <WhiteSpace/>
                <Grid onClick={(elm) => {
                    this.props.history.push(`/category/${elm.text}`)
                }} data={data}/>
            </div>
        )
    }

    componentDidMount () {
        this.props.getBookList();
    }

}

export default Box
