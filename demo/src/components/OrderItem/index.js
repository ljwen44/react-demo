import React, { Component } from 'react'
import './style.css'

class OrderItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stars: props.data.stars || 0,
      editing: false,
      comment: props.data.comment || ""
    }
  }
  render () {
    const { shop, price, product, pic, isCommented } = this.props.data
    return (
      <div className = "orderItem">
        <div className = "orderItem_picContainer">
          <img className = "orderItem_pic" src = { pic } alt="img" />
        </div>
        <div className = "orderItem_content">
          <div className = "orderItem_product">{ product }</div>
          <div className = "orderItem_shop">{ shop }</div>
          <div className = "orderItem_detail">
            <div className = "orderItem_price">{ price }</div>
            <div>
              {
                isCommented 
                ? (<button className = "orderItem_btn orderItem_btn--greyn">已评价</button>) 
                : (<button className = "orderItem_btn orderItem_btn--red" onClick = { this.handleComment }>评价</button>)
              }
            </div>
          </div>
        </div>
        { this.state.editing ? this.renderEditArea() : null }
      </div>
    )
  }

  renderEditArea () {
    // 评价功能
    return (
      <div className = "orderItem_commentContainer">
        <textarea className = "orderItem_comment" onChange = { this.handleCommentChange } value = { this.state.comment } ></textarea>
        { this.renderStars() }
        <button className = "orderItem_btn orderItem_btn--red" onClick = { this.handleSubmit }>提交</button>
        <button className = "orderItem_btn orderItem_btn--grey" onClick = { this.handleCancel }>取消</button>
      </div>
    )
  }

  renderStars () {
    // 五角星评分 ★
    const { stars } = this.state
    return (
      <div>
        {
          [1, 2, 3, 4, 5].map((item, index) => {
            const lightClass = stars >= item ? "orderItem_star--light" : ""
            return (
              <span className = { "orderItem_star " + lightClass } key = { index } onClick = { this.handleStars.bind(this, item)} >☆</span>
            )
          })
        }
      </div>
    )
  }

  handleComment = () => {
    this.setState({
      editing: true
    })
  }

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  handleStars = (stars) => {
    this.setState({
      stars: stars
    })
  }

  handleCancel = () => {
    this.setState({
      editing: false,
      stars: this.props.data.stars || 0,
      comment: this.props.data.comment || ""
    })
  }

  handleSubmit = () => {
    const { id } = this.props.data
    const { comment, stars } = this.state
    this.setState({
      editing: false
    })
    this.props.onSubmit(id, comment, stars)
  }
}

export default OrderItem