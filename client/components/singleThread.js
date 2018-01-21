import React, {Component} from 'react';
import {connect} from 'react-redux'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {retrieveThreads} from '../store/data'


class SingleThread extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: []
        }

        this.threadRetriever = this.threadRetriever.bind(this)
        this.dataAgg = this.dataAgg.bind(this)
    }

    componentDidMount() {
        this.threadRetriever()
        this.interval1 = setInterval(() => this.threadRetriever(), 5000)
        this.interval2 = setInterval(()=> this.dataAgg(), 5000)
        // this.interval3 = setInterval(() => this.props.getData(), 5000)
    }

    componentWillUnmount(){
        clearInterval(this.interval1)
        clearInterval(this.interval2)
        clearInterval(this.interval3)
    }

    threadRetriever() {
       return this.setState((this.props.data && this.props.data.find((thread) => thread.id === this.props.match.params.id)))
    }

    dataAgg() {
        let ups = this.state.ups
        let timeStamp = Date()
        let currentState = this.state.data;
        if ( currentState.length > 30) currentState.shift()
        currentState = [...currentState, {name: timeStamp, ups: this.state.ups}]
        this.setState({data: currentState}) 
    }
    

        render () {
         
            console.log(this.props.match.params.id)
            

          return (
              <div id = "maindiv">
              

              
             <div id = "linechart">
              <AreaChart width={1200} height={500} data={this.state.data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Area dataKey="ups" fill="#7070ff" />
              </AreaChart>
              </div>
              
              <div id = "threadinfobox">
                <div id = "threadinfotext">
              <h2>Title: {this.state.title}</h2>
              <br/>
              
              <h4>Upvotes: {this.state.ups}</h4>
              <br/>
              <img src ={this.state.link}/>
                </div>
              </div>
       

            </div>
        );
      }
    }

    const mapStateToProps = (storeState) => {
        return {
            data: storeState.data
        }
    }

    const mapDispatchToProps = (dispatch) =>({
        getData(){
    return dispatch(retrieveThreads())
        }
    });

    const SingleThreadContainer = connect(mapStateToProps, mapDispatchToProps)(SingleThread)

    export default SingleThreadContainer

