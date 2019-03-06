'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { data } from './data/data';
import { History } from './components/History';
import { AddComment } from './components/AddComment';
import css from './style.css';

const comments = localStorage.comments ? JSON.parse(localStorage.getItem('comments')) : data;

class Comments extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            comments: comments,
        }
    }

    nounEnding = (n, titles) => {
        return titles[(n%10==1 && n%100!=11) ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
    }

    handleCommentAdd = (comment) => {
        const {comments} = this.state;
        const newComments = comments.concat(comment);

        this.setState({
            comments: newComments
        })
    }

    handleDeleteComment = (id) => {
        const {comments} = this.state;

        let deleteIndex = comments.findIndex((element) => {
            return element.id === id
        });
        comments.splice(deleteIndex, 1);

        this.setState ({
            comments
        })
        
    }

    handleLikeComment = (id) => {
        let {comments} = this.state;

        comments = comments.map(element => {
            if (element.id == id) {
               ++element.likes
            }
            return element
        });
        
        this.setState ({
            comments
        });
        
    }

    componentDidMount () {
        const history = document.querySelector('.history__container');
        history.scrollIntoView(false);
    }

    componentDidUpdate () {
        const history = document.querySelector('.history__container');
        history.scrollIntoView(false);

        const {comments} = this.state;
        const serialArr = JSON.stringify(comments);
        localStorage.setItem('comments', serialArr);
    }

    render () {
        const {comments} = this.state;
        const commentsEnding = this.nounEnding(comments.length, ['комментарий', 'комментария', 'комментариев']);
        let text = comments.length ? `Всего ${comments.length} ${commentsEnding}` : `Комментариев пока нет`;

        return (
            <div className="comments">
                <div className="comments__comments-total">
                    <div className="main__container">{text}</div>
                </div>
                <AddComment onCommentAdd={this.handleCommentAdd}/>
                <History data={comments} onDeleteComment={this.handleDeleteComment} onLike={this.handleLikeComment}/>
            </div>
        )
    }
}

ReactDOM.render (
    <Comments />,
    document.getElementById('root')
)
