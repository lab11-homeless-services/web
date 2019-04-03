import React, {useState, useEffect, useReducer} from 'react';
import Header from '../components/Header';
import useFetchSingle from '../functions/useFetchSingle'
import ResourceList from '../components/ResourceList'

const singleResourceView = (props) => {
    // let [listOfResources] = useState([])
    // console.log(props.location.pathname)
    // let category = null
    // let subCat = null
    // const newStuff = props.location.pathname.split('/')
    // category = newStuff[2]
    // subCat = newStuff[3]
    // let url = `https://empact-e511a.firebaseio.com/${category}/${subCat}.json`
    // console.log(url)
    // listOfResources = useFetchSingle(url)
    // console.log(listOfResources)
    
    return(
        <div>
            {/* {listOfResources.map(resource => (
                <div>
                    {resource.name}
                </div>
            ))} */}
            <ResourceList props={props}/>
        </div>
    );
}

// class singleResourceView extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             listOfResources: []
//         }
//     }

//     componentDidMount() {
//         const newStuff = this.props.location.pathname.split('/')
//         const category = newStuff[2]
//         const subCat = newStuff[3]
//         this.setState({
//             listOfResources: useFetch(`https://empact-e511a.firebaseio.com/${category}/${subCat}.json`)
   
//         })
//     }
    
    
    
//     // let listOfResources = []

   
//     render() {
//         return(
//             <div>
//                 {this.state.listOfResources.map(resource => (
//                     <div>
//                         {resource.name}
//                     </div>
//                 ))}
//             </div>
//         );
//     }
    
// }

export default singleResourceView;