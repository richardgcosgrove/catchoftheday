import React from 'react';
import Fish from './Fish';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fishes: {},
            order: {}
        };

        this.addFish = this.addFish.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
    }

    componentWillMount() {
        //this runs right before app is rendered

        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        //check if any order in local storage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if (localStorageRef) {
            //update our App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`,
            JSON.stringify(nextState.order)
        );
    }

    addFish(fish) {
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        this.setState({
            fishes: fishes
        });
    }

    addToOrder(key) {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({
            order: order
        });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({
            fishes: fishes
        });
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({
            order: order
        });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({
            fishes: fishes
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                            key={key}
                            index={key}
                            addToOrder={this.addToOrder}
                            details={this.state.fishes[key]} />
                        )}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    fishes={this.state.fishes}
                    loadSamples={this.loadSamples}
                    removeFish={this.removeFish}
                    updateFish={this.updateFish}
                />
            </div>
        )
    }
}

export default App;
