import { createNewSpot, createSpotImage } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";

function CreateSpot(){ 
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [lat, setLatitude] = useState(0);
    const [lng, setLongitude] = useState(0);
    const [description, setDescription] = useState('');
    const [preViewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);
    
    const createName = (e) => setName(e.target.value);
    const createAddress = (e) => setAddress(e.target.value);
    const createCity = (e) => setCity(e.target.value);
    const createState = (e) => setState(e.target.value);
    const createCountry = (e) => setCountry(e.target.value);
    const createPrice = (e) => setPrice(e.target.value);
    const createLatitude = (e) => setLatitude(e.target.value);
    const createLongitude = (e) => setLongitude(e.target.value);
    const createDescription = (e) => setDescription(e.target.value);
    const createPreviewImage = (e) => setPreviewImage(e.target.value);
    
    useEffect(() => { 
        const errors = [];
        
        if(name.length < 5 || name.length > 10)errors.push('name must be between 5-10 characters')
        if(address.length < 5 || address.length > 30) errors.push('Adress length must be between 5-30 characters')
        if(!name) errors.push(`Name is required`);
        if(!address) errors.push(`Address is required`);
        if(!city) errors.push(`City is required`);
        if(!country) errors.push(`Country is required`);
        if(!state) errors.push(`State is required`);
        if(!lat) errors.push(`Latitude is required`);
        if(!lng) errors.push(`Longitude is required`);
        if(!price) errors.push(`Price is required`);
        if(!description) errors.push(`Description is required`);
        if(!preViewImage) errors.push(`Image is required`);
        if(description.length < 30)errors.push('Descriptions need to be longer than 30 characters')
        if(!Number(price))errors.push('Price must be a number');

         setErrors(errors)
    },[name, address, city, state, lat, lng, price, description, preViewImage])
    

    const submit = async (e) => { 
        e.preventDefault();

        setErrors([]);

        const payload = { 
            name,
            address,
            state,
            country,
            city,
            price,
            lat,
            lng,
            description,
            preViewImage
        }

    
        const newSpot = await dispatch(createNewSpot(payload))
        const spotId = newSpot.id;
        const spotImage = { 
            url: preViewImage,
            preview: true
        }

        await dispatch(createSpotImage(spotImage, spotId))
        .then(closeModal)
        history.push(`/spots/${newSpot.id}`)
        
    
};


    return ( 
        <div className="create-spot-form">
        <h1>Create New Spot</h1>
        <form onSubmit={submit}>
        <ul className="create-errors">
        {errors.map((error, idx) => 
          <li key={idx}>{error}</li>
          )}
        </ul>
        <label>
            <input id="input"
            placeholder="Name of your spot"
            onChange={createName}
            value={name}
            required
            >
            </input>
            <input id="input"
            placeholder="Address"
            onChange={createAddress}
            value={address}
            required
            >
            </input>
            <input id="input"
            placeholder="City"
            onChange={createCity}
            value={city}
            required
            >
            </input>
            <input id="input"
            placeholder="State"
            onChange={createState}
            value={state}
            required
            >
            </input>
            <input id="input"
            placeholder="Country"
            onChange={createCountry}
            value={country}
            required
            >
            </input>
            <input id="input"
            placeholder="Price per night(USD)"
            onChange={createPrice}
            value={price}
            required
            >
            </input>
            <input id="input"
            placeholder="Latitude"
            onChange={createLatitude}
            value={lat}
            required
            >
            </input>
            <input id="input"
            placeholder="Longitude"
            onChange={createLongitude}
            value={lng}
            required
            >
            </input>
            <textarea className="input" 
            rows={4}
            placeholder="Description"
            onChange={createDescription}
            value={description}
            required
            >
            </textarea>
            <input id="input"
            placeholder="https://example/image1.com"
            onChange={createPreviewImage}
            value={preViewImage}
            required
            >
            </input>
            
        </label>
        </form>
        <button className="create-spot-button" type="submit" onClick={submit} >Create Spot</button>
        </div>
    )
}


export default CreateSpot;
