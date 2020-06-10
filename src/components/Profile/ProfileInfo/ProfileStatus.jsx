import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

  // statusInputRef = React.createRef()

  state = {
    editMode: false,
    status: this.props.status
  }

  onStatusChange=(e)=>{
    this.setState({
      status: e.currentTarget.value
    });
  }

  activateEditMode = () => {
    this.setState({editMode: true})
  }

  deactivateEditMode = () => {
    this.setState({editMode: false});
    this.props.updateStatus(this.state.status)
    // this.props.updateStatus(this.setState({status: true}))
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
        <div className={s.status}>
          <span onDoubleClick={this.activateEditMode}>"{this.props.status || "---"}"</span>
        </div>
        }
        {this.state.editMode &&
        <div>
          <input onChange={this.onStatusChange} autoFocus={true} value={this.state.status} onBlur={this.deactivateEditMode}/>
        </div>
        }
      </div>
    )
  }
}

export default ProfileStatus;
