import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBook, getBookTypeList } from './read.redux';
import { Button } from 'antd-mobile';

@connect(
    state => state.reader,
    { getBook, getBookTypeList}
)

class Book extends Component {

    constructor (props) {
        super(props);

        this.state = {
            show: false
        }
    }

    render () {
        let text = this.props.bookContent;
        let id = this.props.match.params.id;

        return text ? (
            <div className="content">
                <div className="top">
                    <h2 className="title">{text.chapter.title}</h2>
                </div>
                <div className="body">
                    {
                        text.chapter.cpContent.split('\n').map((v, i) => <p key={i}>{v}</p>)
                    }
                </div>
                <div className="bottom">
                    <Button onClick={() => this.props.getBook(id, false)}>上一章</Button>
                    <Button onClick={() => this.setState({show: !this.state.show})}>目录</Button>
                    <Button onClick={() => this.props.getBook(id)}>下一章</Button>
                </div>
                {
                    this.state.show ?
                    <div className="nav-list">
                        <div className="list-scroll">
                            {this.props.bookCatalog.map(v => {
                                return (
                                    <p key={v.link}>
                                        {v.title}
                                        {v.isVip ? '需要vip才能阅读' : null}
                                    </p>
                                )
                            })}
                        </div>
                    </div> :
                    null
                }

            </div>
        ) : null;
    }

    componentDidMount () {
        let id = this.props.match.params.id;
        this.props.getBook(id);
    }
}

export default Book;
