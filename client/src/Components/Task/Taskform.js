import  React from 'react'
import axios from 'axios'
import {Col,Button,Form,FormGroup,Label,Input} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class Taskform extends React.Component{
    constructor(){
        super()
        this.state={
            createdBy:'',
            assignedTo:'',
            receipt:'',
            rating:'',
            userslist:[],
            receiptImg:'',
            role:'',
            isLoaded:false,
            loggedInUser:{}


        }
    }
    componentDidMount(){
        axios.get('http://localhost:3005/users/loggedinuser',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            this.setState(()=>({
                loggedInUser:response.data
            }))
        })

        axios.get('http://localhost:3005/users/allUsers',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })

        .then((response)=>{
            this.setState(()=>({
                userslist:response.data
              
            }))
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            createdBy:this.state.createdBy,
            assignedTo:this.state.assignedTo,
            
        }
        // const formData=new FormData()
        // formData.append('receipt',this.state.receipt?this.state.receipt:this.state.receiptImg)
        // this.handleSubmit(formData)
    }
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
          [e.target.name] : e.target.value   
        }))
    }
    handlefileChange=(e)=>{
        e.persist()
        this.setState(()=>({
            receipt:e.target.files[0]
        }))
    }
    render(){
        return(
            <fieldset>
                <h2 className="formheader">Form</h2>
                {this.state.role.includes('instructor')?
                <React.Fragment>
                        <div className="form-group col-md-8">
                    <Form onSubmit={this.handleSubmit} className="formcenter">
                        <div>
                        <FormGroup row>
                            <Label sm={2}className="headerlabel">
                                Username : <br/><span className="bracketsize">(Created By)</span>
                            </Label>
                            <Col sm={10}>
                                <Input name="createdBy" type="select" value={this.state.createdBy} onChange={this.handleChange} className="form-control">
                                        <option value="" >Select</option>
                                        <option value={this.state.loggedInUser._id} >{this.state.loggedInUser.username}</option>
                                    </Input>
                            </Col>
                        </FormGroup>
                        </div>
                        <div>
                        <FormGroup row>
                            <Label sm={2}className="headerlabel">
                                assignedTo : <br/><span className="bracketsize">(assigned to)</span>
                            </Label>
                            <Col sm={10}>
                                <Input name="assignedTo" type="select" value={this.state.assignedTo} onChange={this.handleChange} className="form-control">
                                        <option value="" >Select</option>
                                        <option value={this.state.assignedTo._id} >{this.state.assignedTo.username}</option>
                                    </Input>
                            </Col>
                        </FormGroup>
                        </div>
                        
                        <div>
                        <FormGroup row>
                            <Label sm={2}className="headerlabel">
                                Receipt: <br/><span className="bracketsize">()</span>
                            </Label>
                            <Col sm={10}>
                                <Input name="receipt" type="file"  onChange={this.handlefileChange} className="form-control"></Input>
                                        {/* {this.state.receiptImg=='null'?<img src={`uploads/${this.state.receiptImg}`}alt={`${this.state.receiptImg}`}/>:''} */}
                                    
                            </Col>
                        </FormGroup>
                        </div>

                        

                    </Form>
                </div>

                    

                </React.Fragment>:''}
                <div className="form-group col-md-8">
                    <Form onSubmit={this.handleSubmit} className="formcenter">
                        <div>
                        <FormGroup row>
                            <Label sm={2}className="headerlabel">
                                Username : <br/><span className="bracketsize">(Created By)</span>
                            </Label>
                            <Col sm={10}>
                                <Input name="createdBy" type="select" value={this.state.createdBy} onChange={this.handleChange} className="form-control">
                                        <option value="" >Select</option>
                                        <option value={this.state.loggedInUser._id} >{this.state.loggedInUser.username}</option>
                                    </Input>
                            </Col>
                        </FormGroup>
                        </div>
                        <div>
                        <FormGroup row>
                            <Label sm={2}className="headerlabel">
                                assignedTo : <br/><span className="bracketsize">(assigned to)</span>
                            </Label>
                            <Col sm={10}>
                                <Input name="assignedTo" type="select" value={this.state.assignedTo} onChange={this.handleChange} className="form-control">
                                        <option value="" >Select</option>
                                        <option value={this.state.assignedTo._id} >{this.state.assignedTo.username}</option>
                                    </Input>
                            </Col>
                        </FormGroup>
                        </div>
                        
                        <div>
                        <FormGroup row>
                            <Label sm={2}className="headerlabel">
                                Receipt: <br/><span className="bracketsize">()</span>
                            </Label>
                            <Col sm={10}>
                                <Input name="receipt" type="file" value={this.state.receipt} onChange={this.handlefileChange} className="form-control">
                                        {this.state.receiptImg!=='null'?<img src={`uploads/${this.state.receiptImg}`}alt={`${this.state.receiptImg}`}/>:''}
                                    </Input>
                            </Col>
                        </FormGroup>
                        </div>
                        <div>
                            <Button type="submit" color="primary" onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </fieldset>
        )
    }
}
export default Taskform