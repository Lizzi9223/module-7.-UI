import React, { useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Pagination from '@vlsergey/react-bootstrap-pagination';

import 'bootstrap/dist/css/bootstrap.min.css';  
import './css/MainPage.css';
import AddOrEditCertificate from "./AddOrEditCertificate";

function Certificates(props){
    const[certificates, setCertificates] = useState([]);
    const[currentPage, setCurrentPage] = useState(0);
    const[recordPerPage, setRecordPerPage] = useState(10);
    const[totalPages, setTotalPages] = useState(0);
    const[totalElements, setTotalElements] = useState(0);
    const[creationDateSort, setCreationDateSort] = useState("desc");
    const[nameSort, setNameSort] = useState("desc");
    const[creationDateSortAngle, setCreationDateSortAngle] = useState(0);
    const[nameSortAngle, setNameSortAngle] = useState(0);
    const[sortParams, setSortParams] = useState('');
    const[searchParams, setSearchParams] = useState('');

    const componentDidMount = () => {      
        setSortParams("&sort=create_date," + creationDateSort + "&sort=name," + nameSort);
        getCertificatesByPagination(currentPage);
    }

    const componentWillReceiveProps = (nextProps) => {
        //alert('q');
        if (nextProps.searchParams !== props.searchParams) {
            getCertificatesByPagination(currentPage);
        }
      }

    const getCertificatesByPagination = (currentPage) => {
        //alert('q');
        var searchParams_ = "";
        var isAmpersandSet = false;
        if(props.searchParams.name != null && props.searchParams.name !== ""){
            searchParams += "name=";
            searchParams += props.searchParams.name;
            isAmpersandSet = true;
        }
        if(props.searchParams.tags!= null && props.searchParams.tags.length!=0){
            if(isAmpersandSet) searchParams += "&";
            searchParams += "tagNames=";
            for(let i=0; i < props.searchParams.tags.length; i++){
                searchParams += props.searchParams.tags[i];
                searchParams += ",";
            }
            searchParams = searchParams.slice(0, -1);
        }
        if(searchParams !== "") searchParams += "&";
        setSearchParams(searchParams_);

        axios
        .get("certificate?" + searchParams + "page=" + currentPage + "&size=" + recordPerPage + sortParams)
        .then(response => response.data)
        .then((data) =>{
            if(data.content){
                setCertificates(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
                setCurrentPage(data.number);
                setRecordPerPage(data.size);
            }
        })
        .catch((error) => {
            props.onMessageChange(error.response.data.errorMessage);
        });
    }    

    const handleChangePage = (e) =>{
        setCurrentPage(e.target.value);
        getCertificatesByPagination(currentPage);
    }

    const handleChangeSize = (e) => {
        setRecordPerPage(e.target.value);
        getCertificatesByPagination(currentPage);
    }

    const sortByCreateDate = () =>{
        if(creationDateSort == "desc"){
            setCreationDateSortAngle(180);
            setCreationDateSort("asc");
        }            
        else {
            setCreationDateSortAngle(0);
            setCreationDateSort("desc");
        }
        setSortParams("&sort=create_date," + creationDateSort + "&sort=name," + nameSort);
        getCertificatesByPagination(currentPage);
    }

    const sortByName = () =>{
        if(nameSort == "desc"){
            setNameSortAngle(180);
            setNameSort("asc");
        }            
        else{
            setNameSortAngle(0);
            setNameSort("desc");
        }
        setSortParams("&sort=name," + nameSort + "&sort=create_date," + creationDateSort);
        getCertificatesByPagination(currentPage);
    }

     
    return(
        <div className="certificate-table">
            <table>
                    <thead>
                        <th onClick={sortByCreateDate}>
                            <img class="sortImage" 
                                style={{"transform":"rotate("+creationDateSortAngle+"deg)"}} 
                                src={require('./images/arrow_drop_down.png')} />Datetime
                        </th>
                        <th onClick={sortByName}>
                            <img class="sortImage" 
                                style={{"transform":"rotate("+nameSortAngle+"deg)"}}  
                                src={require('./images/arrow_drop_down.png')} />Title
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
                                            <button 
                                                onClick={() => props.onAddOrEditCertificate(true, true, certificates.id)}
                                                style={{"background" : "#FFA500"}}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => props.onDeleteCertificate(true, certificates.id)} 
                                                style={{"background" : "#B22222"}}
                                            >
                                                    Delete
                                            </button>
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
                        value={currentPage} 
                        totalPages={totalPages} 
                        onChange={e => handleChangePage(e)}/>
                </div>

                <div className="combobox" onChange={e => handleChangeSize(e)} value={recordPerPage}>
                    <select>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
        </div>
    )
}

export default Certificates;