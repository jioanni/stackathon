import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {retrieveThreads} from '../store/data'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import arrayCreator from './utility'



class Data extends Component {
    constructor(props){
        super(props)

        this.state = {
            selection: ''
        }
        this.dataSaver = this.dataSaver.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.props.getData(this.state.selection)
        this.interval1 = setInterval(()=>this.props.getData(this.state.selection), 5000)
    }

    componentWillUnmount(){
        clearInterval(this.interval1)
    }

    dataSaver(dataPoint, array){
        (array.length < 20) ? array.push(dataPoint) : array.shift() && array.push(dataPoint)
        return array
    }
 
    handleChange(){
        this.setState({
            selection: event.target.value
        })
        // clearInterval(this.interval1)
     
    }

    
    
    render() {

        console.log(this.state)
    
        

        return(
            <div id = "data">
            <select onChange = {this.handleChange}>
                <option value="rarepuppers">rarepuppers</option>
                <option value="gaming">gaming</option>
                <option value="aww">aww</option>
            </select>
            <div id = "barchart">
                <BarChart width={1200} height={500} data={this.props.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="title" hide = {true}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="ups" fill="#7070ff" />
                </BarChart>
            </div>
            <div id = "threadNames">
                <ul id="map-list">
            {this.props.data.map((thread) => <li key={thread.id}><Link to = {`${this.state.selection}/${thread.id}`}>{thread.title}</Link>: {thread.ups}</li>  )}
                </ul>
            </div>
            </div>
        )
    }
}




const mapStateToProps = (storeState) => {
    return {
        data: storeState.data
    }
}

const mapDispatchToProps = (dispatch) =>({
    getData(subreddit){
return dispatch(retrieveThreads(subreddit))
    }
});


const dataContainer = connect(mapStateToProps, mapDispatchToProps)(Data)

export default dataContainer