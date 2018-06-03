import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryList } from './read.redux'
import { Card, WhiteSpace } from 'antd-mobile';

@connect(
    state => state.reader,
    { getCategoryList }
)

class Category extends Component {

    render () {
        const Header = Card.Header;
        const Body = Card.Body;

        const style = {
            'overflow' : 'hidden',
            'textOverflow': 'ellipsis',
            'display': '-webkit-box',
            'WebkitLineClamp': 3,
            'WebkitBoxOrient': 'vertical',
        }

        return (
            this.props.categoryList.map(v => (
                <div key={v._id} onClick={() => {
                    this.props.history.push(`/readinfo/${v._id}`)
                }}>
                    <Card full>
                        <Header
                            title={v.title}
                            thumb={`http://statics.zhuishushenqi.com${v.cover}`}
                            extra={<span>{v.author}</span>}
                            thumbStyle={{width: 50}}
                        />
                        <Body>
                            <div style={style}>{v.shortIntro}</div>
                        </Body>
                    </Card>
                    <WhiteSpace />
                </div>
            ))
        )
    }

    componentDidMount () {
        let type = this.props.match.params.type;

        this.props.getCategoryList(type);
    }

}

export default Category;
