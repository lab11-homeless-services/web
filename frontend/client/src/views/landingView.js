import React, { Fragment } from "react";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";
import { useStateValue } from '../state/state'

// class LandingView extends React.Component {
//   render() {
//     console.log(this.props.spanish);
//     return (
//       <div>
//         <SearchBar />
//         <div className="language">
//           <Link to="/home">
//             <div>English</div>
//           </Link>
//           <Link to="/home">
//             <div onClick={this.props.setSpanish}>Español?</div>
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

const LandingView = () => {
  const [{spanish}, dispatch] = useStateValue()

  return (
    <div>
         <SearchBar />
         <div className="language">
           <Link to="/home">
             <div>English</div>
           </Link>
           <Link to="/home">
             <div spanish={spanish.spanish}

             onClick={() => dispatch({
                type: 'setSpanish',
                language: true
              })}>Español?</div>
           </Link>
         </div>
       </div>
  )
}

export default LandingView;
