import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';

type PropsType  ={
  status: string
  updateStatus: (status:string)=>void
}

type StateType  ={
  editMode: boolean,
  status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

  state = {
    editMode: false,
    status: this.props.status
  }

  onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
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
