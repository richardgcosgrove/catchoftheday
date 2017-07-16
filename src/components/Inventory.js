import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {

    constructor() {
        super();

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish, 
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish);
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input onChange={(e) => this.handleChange(e, key)} type="text" name="name" defaultValue={fish.name} placeholder="Fish  name" />
                <input onChange={(e) => this.handleChange(e, key)} type="text" name="price" defaultValue={fish.price} placeholder="Fish price" />
                <select onChange={(e) => this.handleChange(e, key)} value={fish.status}>
                    <option defaultValue="available">Fresh</option> 
                    <option defaultValue="unavailable">Sold Out!</option>
                </select>
                <textarea onChange={(e) => this.handleChange(e, key)} defaultValue={fish.desc} placeholder="Fish Desc"></textarea>
                <input onChange={(e) => this.handleChange(e, key)} type="text" name="image" defaultValue={fish.image} placeholder="Fish image" />
            <button onClick={(e) => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Add Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;