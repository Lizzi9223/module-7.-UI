import React from 'react';

import Certificates from './Certificates2';
import DeleteModal from './DeleteModal';
import AddOrEditCertificate from './AddOrEditCertificate'

import './css/MainPage.css';

class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.onSearchInputChange= this.onSearchInputChange.bind(this);
    this.certificatesRef = React.createRef();
    this.state ={
        errorMessage:"",
        isErrorMessageShown:false, 
        searchString:"",
        searchParams:{
          "name":"",
          "tags":[]
        },
        showDeleteModel:false,
        showAddEditModel:false,
        chosenCertId:0,
        editCertificate:false        
    }
  }

  onMessageChange = (message) => {
    this.setState({ 
      errorMessage: message,
      isErrorMessageShown: true
     });
  }

  closeErrorMessage = () => {
    this.setState({ 
      errorMessage: "",
      isErrorMessageShown: false
     });
  }

  onSearchInputChange = (e) => {
    const value = e.target && e.target.value;
    this.setState({"searchString": value});
  }

  doSearch = () => {
    var name;
    var tags = [];

    const reg = RegExp('(\\w+)\|\#\\((\.\*\?)\\)','g');
    const params = this.state.searchString.matchAll(reg);

    Array.from(params, p => {
      var param = p[0];
      if(param.includes('#')){
        var tag = param.replace('#','').replace('(','').replace(')','');
        tags.push(tag);
        //this.setState({searchParams : {tags : this.state.searchParams.tags.push(tag)}}); //////// TODO        
      } else {
        name=param;        
      } ///////// TODO  //this.setState({searchParams : {name : param}});
    });

    this.setState({searchParams : {name : name, tags : tags}});

    console.log(name + " " + tags); ////////////////

    console.log(JSON.stringify(this.state.searchParams)); //////////
  }

  deleteCertificate = (show, id) => {   
    this.setState({showDeleteModel : show, chosenCertId : id}); 
    if(!show){
      const page = this.certificatesRef.current.state.currentPage; 
      //alert(page);
      //console.log(page);
      this.certificatesRef.current.getCertificatesByPagination(page);  //// reload get gift certificates  
    }
  }

  addOrEditCertificate = (editCertificate, show, id) => {
    this.setState({editCertificate : editCertificate, showAddEditModel : show, chosenCertId : id});
  }

  render(){    
    return(
      <div class="main-page">    
        <div className="error-message" style={{ display: this.state.isErrorMessageShown ? "flex" : "none" }}>
          <div className="status">
            <div className="image"><img src={require('./images/remove.png')} /></div>
            <div>{this.state.errorMessage}</div>
          </div>
          <div className="close" onClick={this.closeErrorMessage}><img src={require('./images/close.png')} /></div>
        </div>

        <div className="search" style={{ marginTop: this.state.isErrorMessageShown ? "1%" : "6%" }}>
          <input type="text" placeholder="Search..." value={this.state.searchString} onChange={this.onSearchInputChange}/>
          <input type="submit" value="Got" onClick={(show, id) => this.doSearch(show, id)} />
        </div>

        <Certificates 
          searchParams={this.state.searchParams} 
          errorMessage={this.state.errorMessage} 
          onMessageChange={this.onMessageChange} 
          onDeleteCertificate={this.deleteCertificate}
          onAddOrEditCertificate={this.addOrEditCertificate}
          ref={this.certificatesRef} />

        <DeleteModal 
          show={this.state.showDeleteModel} 
          id={this.state.chosenCertId}
          onDeleteCertificate={this.deleteCertificate}
          onMessageChange={this.onMessageChange}
          errorMessage={this.state.errorMessage} />

        <AddOrEditCertificate
          editCertificate={this.state.editCertificate}
          show={this.state.showAddEditModel} 
          id={this.state.chosenCertId}
          onAddOrEditCertificate={this.addOrEditCertificate}
          onMessageChange={this.onMessageChange}
          errorMessage={this.state.errorMessage} />
      </div>
    )
  }
}

export default MainPage;