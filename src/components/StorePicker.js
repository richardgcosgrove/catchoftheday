import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    goToStore(event) {
        event.preventDefault();
        console.log('You changed the URL');
        // first grab text from box
        const storeId = this.storeInput.value;
        console.log(storeId);
        // second we're going to transition from / to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter a Store</h2>
                <input 
                    type="text"
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()} 
                    ref={(input) => {
                        this.storeInput = input;
                    }} />
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;
