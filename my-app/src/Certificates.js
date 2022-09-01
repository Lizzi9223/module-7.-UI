import React from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Pagination from '@vlsergey/react-bootstrap-pagination';

import 'bootstrap/dist/css/bootstrap.min.css';  
import './css/MainPage.css';

class Certificates extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            certificates:[],
            currentPage:0,
            recordPerPage:10,
            totalPages:0,
            totalElements:0,
            creationDateSort:"desc",
            nameSort:"desc"
        }
    }

    componentDidMount(){      
        this.getCertificatesByPagination(this.state.currentPage);
    }

    getCertificatesByPagination(currentPage){
        axios.get("certificate?page=" + currentPage + "&size=" + this.state.recordPerPage 
                    + "&sort=create_date," + this.state.creationDateSort + "&sort=name," + this.state.nameSort)
        .then(response => response.data)
        .then((data) =>{
             this.setState({
                certificates:data.content,
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number,
                recordPerPage: data.size
            });
        })
        .catch((error) => {
            console.log(error.message);
          })
    }    

    handleChangePage = (e) =>{
        this.state.currentPage = e.target.value;
        this.getCertificatesByPagination(this.state.currentPage);
    }

    handleChangeSize = (e) =>{
        this.state.recordPerPage = e.target.value;
        this.getCertificatesByPagination(this.state.currentPage);
    }

    sortByCreateDate = () =>{
        if(this.state.creationDateSort == "desc")
            this.state.creationDateSort = "asc";
        else this.state.creationDateSort = "desc";
        this.getCertificatesByPagination(this.state.currentPage);
    }

    sortByName = () =>{
        if(this.state.nameSort == "desc")
            this.state.nameSort = "asc";
        else this.state.nameSort = "desc";
        this.getCertificatesByPagination(this.state.currentPage);
    }

    render(){
        const {certificates} = this.state;
        return(
            <div className="certificate-table">
                <table>
                    <thead>
                        <th onClick={this.sortByCreateDate}>
                            <img style={{"height":"35px"}} src={require('./images/arrow_drop_down.png')} />Datetime
                        </th>
                        <th onClick={this.sortByName}>
                            <img style={{"height":"35px"}} src={require('./images/arrow_drop_down.png')} />Title
                        </th>
                        <th>Tags</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {certificates.length===0 
                            ? <tr align="center"><td colSpan="6" style={{"padding" : "25px"}}>No Certificates Found</td></tr>
                            : certificates.map(
                                (certificates,index) =>(                                    
                                    <tr key = {certificates.id}>
                                        <td>
                                            {
                                                format(parseISO(certificates.createDate), 'yyyy-MM-dd H:mm')
                                            }
                                        </td>
                                        <td>{certificates.name}</td>
                                        <td align="center">
                                            {
                                                certificates.tags.length===0
                                                ? <span>—</span>
                                                : certificates.tags.map((tags, index) => (
                                                    <span>
                                                        {tags.name}
                                                        {
                                                            index+1==certificates.tags.length 
                                                                ? "" 
                                                                : <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>

                                                        }
                                                    </span>
                                                ))
                                            }
                                        </td>
                                        <td>{certificates.description}</td>
                                        <td>{certificates.price}</td>
                                        <td className="buttons" align="center">
                                            <button style={{"background" : "#0000CD"}}>View</button>
                                            <button style={{"background" : "#FFA500"}}>Edit</button>
                                            <button style={{"background" : "#B22222"}}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

                <div className="pagination">
                    <Pagination 
                        aroundCurrent={4} 
                        showFirstLast={true} 
                        showPrevNext={true} 
                        atBeginEnd={0} 
                        value={this.state.currentPage} 
                        totalPages={this.state.totalPages} 
                        onChange={e => this.handleChangePage(e)}/>
                </div>

                <div className="combobox" onChange={e => this.handleChangeSize(e)} value={this.state.recordPerPage}>
                    <select>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
        </div>
        )
    }
}

export default Certificates;