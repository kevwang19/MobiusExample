import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, NavLink, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';


//Provided Data
const getRequestResult = [
  {
      "model":"core.bomitem",
      "pk":10001,
      "fields":{
         "uuid":"0b1ee8c4-03bd-4fd8-a016-226dba25f0f6",
         "created_at":"2020-08-27T00:38:01.689Z",
         "updated_at":"2020-08-27T00:38:01.689Z",
         "is_active":true,
         "bom":1001,
         "quantity":1,
         "specific_part":10004,
         "item_unit_cost":0.3000
      }
   },
   {
      "model":"core.bomitem",
      "pk":10002,
      "fields":{
         "uuid":"cf0fe0cf-9b21-4552-9ab8-f43373dd67b7",
         "created_at":"2020-08-27T01:19:37.967Z",
         "updated_at":"2020-08-27T01:19:37.967Z",
         "is_active":true,
         "bom":1001,
         "quantity":1,
         "specific_part":10001,
         "item_unit_cost":0.3400
      }
   },
   {
      "model":"core.bomitem",
      "pk":10003,
      "fields":{
         "uuid":"7486533d-1586-4ca0-99fe-56a1eebe6b91",
         "created_at":"2020-08-27T02:24:57.589Z",
         "updated_at":"2020-08-27T02:24:57.589Z",
         "is_active":true,
         "bom":1001,
         "quantity":3,
         "specific_part":10002,
         "item_unit_cost":1.3000
      }
   },
   {
      "model":"core.bomitem",
      "pk":10004,
      "fields":{
         "uuid":"c0a98c99-1bdc-4925-85db-e0bdb89608b4",
         "created_at":"2020-08-29T00:13:55.815Z",
         "updated_at":"2020-08-29T00:13:55.815Z",
         "is_active":true,
         "bom":1001,
         "quantity":10,
         "specific_part":10005,
         "item_unit_cost":1.9000
      }
   }
]

//Styling
const Title = styled.div`
  padding-top: 120px;
  display: flex;
  justify-content: center;
  font-size: 36px;
`
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 150px;
`
const ItemBox = styled.div`
  background-color: skyblue;
  padding: 50px;
  margin: 50px;
  border-radius: 20px;
`
const DetailBox = styled.div`
  margin: 15px;
  display: flex;
  justify-content: space-between;
`
const ActionButton = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 60px;
  text-align: center;
  cursor: pointer;
  margin: auto;
  margin-top: 30px;
`
const Input = styled.input`
  width: 50px;
  border: none;
  border-radius: 5px;
  padding: 6px;
  font-size: 14px;
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
        margin: 0;
  }
  ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
`
const ToggleStatus = styled.div`
  cursor: pointer;
  border-radius: 5px;
  padding: 6px;
  background-color: white;
  font-size: 14px;
`



class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bomItems: [],
      editingItems: []
    }
  }

  componentDidMount() {
    //Get BOM Data
    //axios.get('https://www.mobiusmaterials.com/api/v1/bom/1001').then((data)=>...)
    this.setState({bomItems: getRequestResult})
  }

  saveItem = (itemIndex) => {
    const itemToUpdate = this.state.bomItems[itemIndex]
    if (!itemToUpdate.fields.quantity || !itemToUpdate.fields.item_unit_cost) {
      console.log('Handle NaN values!')
    } else {
      const editingItems = this.state.editingItems
      const index = editingItems.indexOf(itemIndex)
      if (index > -1) {
        editingItems.splice(index, 1)
      }
      this.setState({editingItems: editingItems})
      console.log([itemToUpdate.pk, itemToUpdate.fields.is_active, itemToUpdate.fields.quantity, itemToUpdate.fields.item_unit_cost])
      //Update BOM Data
      //axios.put('https://www.mobiusmaterials.com/api/v1/bom/1001/bomitem/{bomitem_id}', itemToUpdate).then((result)=>...)
    }
  }

  handleChangeCost = (e, i, item) => {
    e.preventDefault()
    const bomItems = this.state.bomItems
    const itemToUpdate = item
    itemToUpdate.fields.item_unit_cost = parseFloat(e.target.value, 10)
    bomItems[i] = itemToUpdate
    this.setState({bomItems: bomItems})
  }

  handleChangeQuantity = (e, i, item) => {
    e.preventDefault()
    const bomItems = this.state.bomItems
    const itemToUpdate = item
    itemToUpdate.fields.quantity = parseInt(e.target.value, 10)
    bomItems[i] = itemToUpdate
    this.setState({bomItems: bomItems})
  }

  toggleStatus = (i, item) => {
    const bomItems = this.state.bomItems
    const itemToUpdate = item
    itemToUpdate.fields.is_active = !itemToUpdate.fields.is_active
    bomItems[i] = itemToUpdate
    this.setState({bomItems: bomItems})
  }



  render() {
    //Dynamic items to be rendered
    const bomItems = this.state.bomItems.map((item, i)=> {
      const actionButton = this.state.editingItems.includes(i) === true ?
        <ActionButton onClick={()=> this.saveItem(i)}>Save</ActionButton> :
        <ActionButton onClick={()=> {
          const editingItems = this.state.editingItems
          editingItems.push(i)
          this.setState({editingItems: editingItems})
        }}>Edit</ActionButton>

      const status = this.state.editingItems.includes(i) === true ?
        <ToggleStatus onClick={()=> this.toggleStatus(i, item)}>{this.state.bomItems[i].fields.is_active === true ? 'Make Inactive' : 'Make Active'}</ToggleStatus> :
        <div>{item.fields.is_active === true ? 'Active' : 'Inactive'}</div>

      const quantity = this.state.editingItems.includes(i) === true ?
        <Input type="number" value={this.state.bomItems[i].fields.quantity} onChange={(e)=> this.handleChangeQuantity(e, i, item)}/> :
        <div>{this.state.bomItems[i].fields.quantity}</div>

      const cost = this.state.editingItems.includes(i) === true ?
        <Input type="number" value={this.state.bomItems[i].fields.item_unit_cost} onChange={(e)=> this.handleChangeCost(e, i, item)}/> :
        <div>{this.state.bomItems[i].fields.item_unit_cost.toFixed(4)}</div>

      return (
        <ItemBox key={i}>
          <DetailBox>
            <div style={{padding: 6}}><b>PK:</b></div>
            <div>{item.pk}</div>
          </DetailBox>
          <DetailBox>
            <div style={{padding: 6}}><b>Status:</b></div>
            {status}
          </DetailBox>
          <DetailBox>
            <div style={{padding: 6}}><b>Quantity:</b></div>
            {quantity}
          </DetailBox>
          <DetailBox>
            <div style={{padding: 6}}><b>Cost In $ Per Unit:</b></div>
            {cost}
          </DetailBox>
          {actionButton}
        </ItemBox>
      )
    })

    //Static items to be rendered
    return (
      <React.Fragment>
        <Title>Mobius BOM Items Editor</Title>
        <ItemsContainer>{bomItems}</ItemsContainer>
      </React.Fragment>
    );
  }
}

export default Main;
