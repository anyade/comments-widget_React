'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from './Comment';

class History extends React.Component {
    render () {
        const {data} = this.props;
        
        const comments = data.map( element => {
            return <Comment key={element.id} comment={element} onDeleteComment={this.props.onDeleteComment} onLikeComment={this.props.onLike}/>
        })

        return (
            <section className="comments__comments-history history">
                <div className="main__container">
                    <h2 className="visually-hidden">История комментариев</h2>
                    <div className="history__container">
                        {comments}
                    </div>
                </div>
            </section>
        )
    }
}

History.propTypes = {
    data: PropTypes.array.isRequired,
}

export { History }