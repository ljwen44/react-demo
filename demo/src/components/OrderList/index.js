import React, { Component } from 'react'
import OrderItem from '../OrderItem'
import './style.css'

class OrderList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    // 模拟 ajax 请求数据
    // 因为 mock 放在公共资源上，故可以直接用路径去请求数据
    fetch('/mock/orders.json').then(res => {
      if (res.ok) {
        res.json().then(data => {
          this.setState({
            data
          })
        })
      }
    })
  }

  render() {
    return (
      <div>
        {
          // 进行遍历渲染
          this.state.data.map(item => {
            return <OrderItem data = { item } key = { item.id } onSubmit = { this.handleSubmit } />
          })
        }
        
      </div>
    )
  }

  handleSubmit = (id, comment, stars) => {
    fetch('saveComment').then(() => {
      // 数据传入服务器再执行一下代码
    })
    const newData = this.state.data.map(item => {
      return item.id === id 
      ? {
        ...item, comment, stars, isCommented: true
      }
      : item
    })
    this.setState({
      data: newData
    })
  }
}

export default OrderList