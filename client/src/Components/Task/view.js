import React from 'react'
import axios from 'axios'
import { Form } from 'reactstrap'

class ForView  extends React.Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3005/taskform/view',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(response.data,'in view')
            this.setState(()=>({
                data:response.data
            }))
        })
    }
    render(){
        return(
            <div>
                <h1>tasks</h1>
                <table border="3">
                    <thead>
                        <tr>
                            <th>CreatedBy</th>
                            <th>Asigned to</th>
                            <th>Image</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map(item=>{
                            return(
                                <>
                                <tr key={item._id}>
                                <td>{item.createdBy.username}</td>
                                <td>{item.assignedTo.username}</td>
                                <td></td>
                                <td>{item.rating}</td>

                                </tr>
                                </>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ForView