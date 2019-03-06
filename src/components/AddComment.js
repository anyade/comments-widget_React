'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class AddComment extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            author: '',
            text: ''
        }
    }

    checkInput = input => {
        let flag = false;
        if (input.trim()) flag = true
        return flag
    };

    handleChange = e => {
        const {id, value} = e.currentTarget;

        this.setState ({
            [id]: value
        })
    }

    handleClick = e => {
        e.preventDefault();
        
        const monthsNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        const {author, text} = this.state;
        const dateTime = new Date();
        const id = +dateTime;
        const comDate = dateTime.getDate();
        const month = monthsNames[dateTime.getMonth()];
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const date = `${comDate} ${month} ${year}, ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;


        this.props.onCommentAdd({
            id,
            author,
            text,
            date,
            likes: 0
        })

        this.setState ({
            author: '',
            text: ''
        })
    }

    render () {
        const {author, text} = this.state;
        const btnDisabled = (this.checkInput(author) && this.checkInput(text)) ? false : true;

        return (
            <section className="comments__add-comment add-comment">
                <div className="main__container">
                    <h2 className="visually-hidden">Добавьте свой комментарий</h2>
                    <div className="add-comment__wrapper">
                        <input type="text" id="author" className="add-comment__author font" placeholder="Ваше имя" onChange={this.handleChange} value={this.state.author}/>
                        <textarea id="text" rows="3" className="add-comment__text font" placeholder="Ваш комментарий..." onChange={this.handleChange} value={this.state.text}></textarea>
                        <button className="add-comment__button font" disabled={btnDisabled} onClick={this.handleClick}>Добавить</button>
                    </div>
                </div>
            </section>
        )
    }
}

AddComment.propTypes = {
    onCommentAdd: PropTypes.func.isRequired,
}

export { AddComment }