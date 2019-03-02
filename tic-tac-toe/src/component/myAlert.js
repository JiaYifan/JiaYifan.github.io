import React from 'react'
import '../css/myAlert.css';

export default class MyAlert extends React.Component {
    render(){
        return(
            <div className="box">
                {this.props.alert}
                <button onClick={() => this.props.onClick()}>确定</button>
            </div>
        )
    }
}