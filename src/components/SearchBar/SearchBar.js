import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
  }
handleTermChange(e){
  this.setState({searchTerm: e.target.value})
  console.log(e.target.value)
}

search(){
    //const search = e.target.value;
    this.props.onSearch(this.state.searchTerm);
    console.log(`searched: ${this.state.searchTerm}`)

}
  render(){
    return(
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist"/>
        <a onClick={this.search} >SEARCH</a>
      </div>
      )
  }
}

export default SearchBar;
