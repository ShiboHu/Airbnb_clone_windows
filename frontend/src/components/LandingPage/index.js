import { allSpots } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import './LandingPage.css'
import { useHistory } from "react-router-dom";

function LandingPage() { 
    const history = useHistory();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)

    useEffect(() => { 
        dispatch(allSpots(spots))
    },[]);

    if(!spots.Spots) return null;

    const fixedDecimal = (num) => { 
      if(num === 0){ 
        return 'New'
      }
        else if (num % 1 === 0) {
          // console.log(num.toString().match(/^\d+(?:\.\d{0,2})?/))
            return num.toString().match(/^\d+(?:\.\d{0,1})?/)
          }
      //   return num
      // }
      else { 
      return Math.floor(num * 100) / 100
      }
    }

    return ( 
      <>
        <div className="landing-page">
          <ul className="spot-card" >
          {spots.Spots.map((spot) => 
          <div key={spot.id} className="spot-card-column" onClick={()=> {history.push(`/spots/${spot.id}`)}}>
          <li >
            <img 
            className="spot-image" 
            src={spot.previewImage} 
            alt="previewimages">
            </img>
            <h3 className="title-text">
            {spot.name}
            &nbsp;&nbsp;&#9733;
            {fixedDecimal(spot.avgRating)}
            </h3>
            <h4  className="city-text">{spot.city},&nbsp;&nbsp;{spot.country}</h4>
            <h4  className="price-text">${spot.price}&nbsp;night</h4>
          </li>
          </div>
          )}
          </ul>
        </div>    
        </>
    )
}

export default LandingPage
