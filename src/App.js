import React, { Component } from "react";
import MediaQuery,{ useMediaQuery } from 'react-responsive'



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

  dragStart=(e)=>{
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd=(e)=> {
    this.dragged.style.display = 'block';
    var data = this.state.data[this.state.selectedProject].tasks;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    let temp=this.state.data
    temp[this.state.selectedProject].tasks=data
    this.setState({data: temp});
  }

  dragOver=(e)=> {
    e.preventDefault();
    this.dragged.style.display = "none";
    this.over = e.target;
  }
  

  render() {
    return (
      <div style={styles.app}>
         
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
          <ul style={styles.list}>
            {this.state.selectedProject != null ? (
              this.state.data[this.state.selectedProject].tasks.map(
                (item, index) => {
                  return <ListItem key={index} item={item} dragStart={this.dragStart} dragEnd={this.dragEnd} dragOver={this.dragOver} index={index}/>;
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
          <ul style={styles.list}>
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
    <div style={styles.taskDivMobile} draggable={true}>
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
      <div style={styles.taskDiv} draggable={true} onDragStart={props.dragStart} onDragEnd={props.dragEnd} onDragOver={props.dragOver}  data-id={props.index}>
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
  app :{
    textAlign:'center',
    paddingTop: '10px',
    paddingBottom: '10px',
    width:'100%',
    margin: '0px',
    marginLeft: '0px',
    /* padding:0px; */
    /* overflow-y: auto; */
    backgroundColor: '#282c34'
  }
}

export default App;
