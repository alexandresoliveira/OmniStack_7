import React, { Component } from 'react';
import api from '../../services/Api'

import './New.css';

class New extends Component {

  state = {
    image: [],
    author: '',
    place: '',
    description: '',
    hashtags: ''
  }

  handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);
    await api.post('posts', data);
    this.props.history.push('/');
  };

  handleFileChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleFileChange} /> 
        <input type="text" onChange={this.handleChange} value={this.state.author} name="author" placeholder="Autor do post" />
        <input type="text" onChange={this.handleChange} value={this.state.place} name="place" placeholder="Local do post" />
        <input type="text" onChange={this.handleChange} value={this.state.description} name="description" placeholder="Descrição do post" />
        <input type="text" onChange={this.handleChange} value={this.state.hashtags} name="hashtags" placeholder="Hashtags do post" />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;