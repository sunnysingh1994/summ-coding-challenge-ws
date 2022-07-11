import React,{Component} from 'react';
import {variables} from './Variables.js';
 
export class Translation extends Component{
 
   constructor(props){
       super(props);
 
        this.state={
            
            translations:[],
            modalTitle:"",
            TranslationInputs:"",
            TranslationOutputs:"",
            TranslationId:0,

            TranslationIdFilter:"",
            TranslationInputsFilter:"",
            TranslationOutputsFilter:"",
            translationsWithoutFilter:[]
        }

   }

   FilterFn(){
    var TranslationIdFilter= this.state.TranslationIdFilter;
    var TranslationInputsFilter = this.state.TranslationInputsFilter;
    var TranslationOutputsFilter = this.state.TranslationOutputsFilter;

    var filteredData=this.state.translationsWithoutFilter.filter(
        function(el){
            return el.TranslationId.toString().toLowerCase().includes(
                TranslationIdFilter.toString().trim().toLowerCase()
            )&&
            el.TranslationInputs.toString().toLowerCase().includes(
                TranslationInputsFilter.toString().trim().toLowerCase()
            )
            &&
            el.TranslationOutputs.toString().toLowerCase().includes(
                TranslationOutputsFilter.toString().trim().toLowerCase()
            )
        }
    );

    this.setState({translations:filteredData});

}

sortResult(prop,asc){
    var sortedData=this.state.translationsWithoutFilter.sort(function(a,b){
        if(asc){
            return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
        }
        else{
            return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
        }
    });

    this.setState({translations:sortedData});
}

    changeTranslationIdFilter = (e)=>{
    this.state.TranslationIdFilter=e.target.value;
    this.FilterFn();
}
    changeTranslationInputsFilter = (e)=>{
    this.state.TranslationInputsFilter=e.target.value;
    this.FilterFn();
}
    changeTranslationOutputsFilter = (e)=>{
    this.state.TranslationOutputsFilter=e.target.value;
    this.FilterFn();
}

   refreshList(){
       fetch(variables.API_URL+'translation')
       .then(response=>response.json())
       .then(data=>{
           this.setState({translations:data,translationsWithoutFilter:data});
       });
   }
 
   componentDidMount(){
       this.refreshList();
   }

   changeTranslationInputs =(e)=>{
    this.setState({TranslationInputs:e.target.value});
}

   changeTranslationOutputs =(e)=>{
    this.setState({TranslationOutputs:e.target.value});
}
   
   addClick(){
    this.setState({
        modalTitle:"Add TranslationObject",
        TranslationId:0,
        TranslationInputs:"",
        TranslationOutputs:""
    });
}

    editClick(tran){
        this.setState({
            modalTitle:"Edit Department",
            TranslationId:tran.TranslationId,
            TranslationInputs:tran.TranslationInputs,
            TranslationOutputs:tran.TranslationOutputs
        });
}

    createClick(){
        fetch(variables.API_URL+'translation',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TranslationInputs:this.state.TranslationInputs,
                TranslationOutputs:this.state.TranslationOutputs
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'translation',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TranslationId:this.state.TranslationId,
                TranslationInputs:this.state.TranslationInputs,
                TranslationOutputs:this.state.TranslationOutputs
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'translation/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

   render(){
       const{
           translations,
           modalTitle,
           TranslationId,
           TranslationInputs,
           TranslationOutputs
          }=this.state;
    
   return(
    <div>
          <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add TranslationObject
    </button>

       <table className="table table-striped">
   <thead>
   <tr>
       <th>
       <div className="d-flex flex-row">
            <input className="form-control m-2"
            onChange={this.changeTranslationIdFilter}
            placeholder="Search/Filter"/>
             <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('TranslationId',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('TranslationId',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            
            </div>
            TranslationId
       </th>
       <th> 
        <div className="d-flex flex-row">
            <input className="form-control m-2"
            onChange={this.changeTranslationInputsFilter}
            placeholder="Search/Filter"/>
             <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('TranslationInputs',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('TranslationInputs',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            TranslationInputs
       </th>
       <th>   
            <div className="d-flex flex-row">
            <input className="form-control m-2"
            onChange={this.changeTranslationOutputsFilter}
            placeholder="Search/Filter"/>
             <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('TranslationOutputs',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('TranslationOutputs',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            TranslationOutputs
       </th>
       <th>
           Options
       </th>
   </tr>
   </thead>
   <tbody>
 
       {translations.map(tran=>
        <tr key={tran.TranslationId}>
       <td>{tran.TranslationId}</td>
       <td>{tran.TranslationInputs}</td>
       <td>{tran.TranslationOutputs}</td>
       <td>
       <button type="button"
       className="btn btn-light mr-1" data-bs-toggle="modal"
       data-bs-target="#exampleModal"
       onClick={()=>this.editClick(tran)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
       </button>
 
       <button type="button"
       className="btn btn-light mr-1"
       onClick={()=>this.deleteClick(tran.TranslationId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
       </button>

       </td>
   </tr>
   )}
   </tbody>
   </table>

   <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">TranslationInputs</span>
        <input type="text" className="form-control"
        value={TranslationInputs}
        onChange={this.changeTranslationInputs}/>
               <span className="input-group-text">TranslationOutputs</span>
         <input type="text" className="form-control"
        value={TranslationOutputs}
        onChange={this.changeTranslationOutputs}/>
       </div>

        {TranslationId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {TranslationId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

   </div>
   </div>
   </div>
   </div>
   </div>
   )
   }

   }

