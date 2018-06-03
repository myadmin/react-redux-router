import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, WhiteSpace, Button } from 'antd-mobile';
import { getBookInfo } from './read.redux';
import './ReadInfo.css'

@connect(
    state => state.reader,
    { getBookInfo }
)

class ReadInfo extends Component {

    render () {
        let reader = this.props.readerContent;
        console.log(reader);
        return reader ? (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                >
                    {reader.title}
                </NavBar>
                <WhiteSpace/>
                <div className="reader-wrap">
                    <div className="wrap-content">
                        <div className="wrap-list">
                            <img src={`http://statics.zhuishushenqi.com${reader.cover}`} alt={reader.title}/>
                        </div>
                        <div className="wrap-list">
                            <h2 className="book-title">{reader.title}</h2>
                            <div className="book-msg">
                                <span>作者：{reader.author}</span>
                                <span>类别：{reader.cat}</span>
                                <span>总字数：{reader.wordCount}</span>
                                <span>点击量：{reader.postCount}</span>
                                <p className="tag">连载中</p>
                            </div>
                        </div>
                    </div>
                    <div className="book-btns">
                        <Button>加入书签</Button>
                        <Button onClick={() => {
                            this.props.history.push(`/book/${reader._id}`);
                        }}>开始阅读</Button>
                    </div>
                </div>
                <WhiteSpace/>
            </div>
        ) : null
    }

    componentDidMount () {
        let id = this.props.match.params.id;

        this.props.getBookInfo(id);
    }

}

export default ReadInfo
