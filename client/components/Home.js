import React, { Component } from 'react'
import {connect} from 'react-redux'
//TODO - move this to redux store
import axios from 'axios';
import { setAuth } from '../store';

/**
 * COMPONENT
 */
class Home extends Component{
  constructor(){
    super();
    this.state = {
      avatar: ''
    };
    this.changeAvatar = this.changeAvatar.bind(this);
  }
  componentDidMount(){
    this.el.addEventListener('change', (ev)=> {
      const file = ev.target.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', (ev)=> {
        this.setState({ avatar: reader.result});
      });
      reader.readAsDataURL(file);
    });
  }
  async changeAvatar(ev){
    ev.preventDefault();
    await this.props.changeAvatar(this.state.avatar);
    this.setState({ avatar: ''});

  }
  render(){
    const {username} = this.props
    const { changeAvatar } = this;
    const { avatar } = this.state;

    return (
      <div>
        <h3>Welcome, {username}</h3>
        <form className='avatar-form' onSubmit={ changeAvatar }>
          <input type='file' ref={ ref => this.el = ref }/>
          <button disabled={ !avatar }>Set Your Avatar</button>
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAvatar: async(avatar)=> {
      const response = await axios.put('/api/users', { avatar }, {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      });
      const user = response.data;
      dispatch(setAuth(user));
    }
  };
};

export default connect(mapState, mapDispatchToProps)(Home)
