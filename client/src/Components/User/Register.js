import React from 'react';
import axios from 'axios';
// import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Col,Button,Form,FormGroup,Label,Input} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
class Register extends React.Component {
    constructor() {
        super()
        this.state={
            username: '', 
            email: '',
            password: '',
            conformpassword:'',
            levels:[],
            levels_total:[{id:'1',name:'Beginner'},{id:2,name:'Intermediate'},{id:3,name:'Advanced'}],
            roles:[{id:'1',name:"student"},{id:'2',name:"instructor"}],
            level:'',
            role:'',
            notice:''
        }
    }

    handleChange = (e) => {
        e.persist() 
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    handleroleChange=(e)=>{
        e.persist()
        // console.log(e.target.value)
        if(e.target.value=='student'){
            this.setState({
               
                levels:this.state.levels_total,
                role:e.target.value
            })
            
        }
        else{
            this.setState({
                role:e.target.value,
                levels:[]
            })
        }
        //console.log(this.state.role,'inthis')



    }

    handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role:this.state.role,
        level:this.state.level
    }
    console.log(formData)
    if(this.state.password===this.state.conformpassword) {
        axios.post('http://localhost:3005/users/register', formData)
        .then(response => {
            console.log(response.data,'n')
            if(response.data.errors) {
                this.setState(() => ({
                    errors: response.data.errors
                }))
            } else {
                this.props.history.push('/users/login')
            }   
        })
    } else {
        this.setState(()=>({
            notice:'passwords didnot match'
        }))
    }     
} 
    render() 
    {
        return(
            <div>
                <div className="col-md-6 formheader">
                    <h2 className="pt-3 pb-3">Register with us </h2>
                <Form onSubmit={this.handleSubmit}>
                    <div>
                    <FormGroup row>
                        <Label 
                        className="headerlabel"
                        for="username" 
                        sm={2}>Username:</Label>
                        <Col sm={10}>
                        <Input 
                        type="text" 
                        name="username"
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        className="form-control" 
                        placeholder="min 4 character "
                        ></Input>
                        </Col>
                    </FormGroup>
                    </div>
                   
                    <div>
                    <FormGroup row>
                        <Label sm={2} className="headerlabel">
                            Email :
                        </Label>
                        <Col sm={10}>
                            <Input type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter email">
                                </Input>
                        </Col>
                        </FormGroup>
                    </div>

                    <div>
                        <FormGroup row>
                            <Label sm={2} className="headerlabel">
                                Password:
                            </Label>
                            <Col sm={10}>
                                <Input type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="min 5 character"
                                ></Input>
                            </Col>
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup row>
                            <Label sm={2} className="headerlabel">
                            Conform Password:
                            </Label>
                            <Col sm={10}>
                                <Input type="password"
                                    name="conformpassword"
                                    value={this.state.conformpassword}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Enter  conform password"
                                ></Input>
                            </Col>
                        </FormGroup>
                    </div>
                    <div>
                    <FormGroup row>
                        <Label sm={2} className="headerlabel">
                            Role :
                        </Label>
                        <Col sm={10}>
                           <Input name="role" type="select" value={this.state.role} onChange={this.handleroleChange} className="form-control">
                               <option value="">Select</option>
                               {this.state.roles.map(role=>{
                                   return <option key={role.id}
                               value={role.name}>{role.name}</option>
                               })}

                               
                           </Input>
                        </Col>
                        </FormGroup>
                    </div>

                    <div>
                    <FormGroup row>
                        <Label sm={2} className="headerlabel">
                            Level :
                        </Label>
                        <Col sm={10}>
                            <Input name="level" type="select" value={this.state.level} onChange={this.handleChange} className="form-control">
                                <option value="">Select</option>
                                {this.state.levels.map((level)=>{
                                    return <option key={level.id} value={level.name} >{level.name}</option>
                                })}
                            </Input>
                        </Col>
                        </FormGroup>
                    </div>
                    {this.state.notice && <p className="text text-danger"> {this.state.notice} </p>}
                    <Button className="submit" color="primary">Submit</Button>
                </Form>
            </div>
        </div> 
        )
    }
}
export default Register