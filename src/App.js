import React, { Component } from "react";
import MediaQuery,{ useMediaQuery } from 'react-responsive'
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], selectedProject: null ,showDropDownContent:false};
  }
  componentDidMount() {
    fetch("http://www.mocky.io/v2/5e90316a330000741327d563")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          data: data.projects,
          selectedProject: data.projects.length > 0 ? 0 : null,
        });
      });
  }

  setIsShown=()=>{
   
    this.setState({showDropDownContent:!this.state.showDropDownContent})
  }

  handleChange = (event) => {
    this.setState({ selectedProject: event.target.value });
  };

  

  render() {
    return (
      <div className="App">
         
        <div style={styles.dropdown} onClick={() => this.setIsShown()}>
          <span>{`Select Project : `}</span>
          <select onChange={this.handleChange}>
            {
              this.state.data.map((item,index)=>{
              return <option value={index} key={index}>{item.name}</option>
              })
            }
          </select>
        </div>

        <MediaQuery minDeviceWidth={1224}>
        <div style={styles.todoListDisplayPannel}>
          <ul className="list">
            {this.state.selectedProject != null ? (
              this.state.data[this.state.selectedProject].tasks.map(
                (item, index) => {
                  return <ListItem key={index} item={item} />;
                }
              )
            ) : (
              <div />
            )}
          </ul>
        </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={800}>
        <div style={styles.todoListDisplayPannelMobile}>
          <ul className="list">
            {this.state.selectedProject != null ? (
              this.state.data[this.state.selectedProject].tasks.map(
                (item, index) => {
                  return <ListItem key={index} item={item} />;
                }
              )
            ) : (
              <div />
            )}
          </ul>
        </div>
        </MediaQuery>
      </div>
    );
  }
}

const ListItem = (props) => {
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 500 })
  if(isTabletOrMobile){
  return (
    <div style={styles.taskDivMobile}>
      <input
        type="checkbox"
        style={styles.checkBox}
        name={props.item.taskName}
      ></input>
      {props.item.taskName}
    </div>
  );
  }else{
    return (
      <div style={styles.taskDiv}>
        <input
          type="checkbox"
          style={styles.checkBox}
          name={props.item.taskName}
        ></input>
        {props.item.taskName}
      </div>
    );
  }
};

const styles={
  todoListDisplayPannel :{
    width: '100%',
    height:'100%',
    overflowY:'scroll',
    backgroundColor: '#282c34',
    alignSelf: 'center',
    padding:'5px',
    position: 'absolute',
    color: '#61dafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoListDisplayPannelMobile :{
    width: '100%',
    height:'100%',
    overflowY:'scroll',
    backgroundColor: '#282c34',
    alignSelf: 'center',
    padding:'5px',
    position: 'absolute',
    color: '#61dafb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list:{
    margin: '0px',
    padding: '0px',
  },
  
  taskDivMobile:{
    width: '80%',
    paddingTop:'5%',
    paddingBottom: '5%',
    backgroundColor: '#7395AE',
    marginLeft: '10%',
    borderRadius: '10px',
    marginTop: '10px',
    borderWidth: '2px',
    borderStyle: 'double',
    borderColor: '#557A95',
    justifyContent: 'space-around',
    color:'white'
  },
  taskDiv:{
    width: '80%',
    paddingTop:'2%',
    paddingBottom: '2%',
    backgroundColor: '#7395AE',
    marginLeft: '10%',
    borderRadius: '10px',
    marginTop: '10px',
    borderWidth: '2px',
    borderStyle: 'double',
    borderColor: '#557A95',
    justifyContent: 'space-around',
    color:'white'
  },
  
  checkBox:{
    float: 'left',
    marginLeft: '30px'
  },
  
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    color:'white'
  },

  dropdownMobile:{
    position: 'relative',
    display: 'block',
    padding:'0px',
    margin:'0px'
  },
  
  dropDownItem:{
    padding: '12px 16px'
  },
  dropDownItemHover:{
    padding: '12px 16px',
    backgroundColor: '#61dafb'
  },
  
  dropdownContent :{
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    maxHeight:'200px',
    overflowY:'scroll',
    zIndex: 'auto'
  },
  dropdownContentMobile:{
    display: 'block',
    margin:'0px',
    // backgroundColor: '#f9f9f9',
    width:'100%',
    // boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    
    zIndex: '1'
  }
  
  // dropdown:  {
  //   display: 'block'
  // },
  // dropdownContent:{
  //   display: 'block'
  // }
    
}

export default App;
