export var cart = {
    _id: '',
    year: '',
    make: '',
    model: '',
    description: '',
    amount: '',
    available: ''
}

export const changeCart = (props) => {

    console.log('Changecart props: ' + props)
    cart._id = props._id;
    cart.year = props.year;
    cart.make = props.make;
    cart.model = props.model;
    cart.description = props.description;
    cart.amount = props.amount;
    cart.available = props.available;
    console.log(cart);
    return cart;
}
