import React, {Component} from 'react';
import {Notification} from './components/notification';
import {Item} from "./components/item";
import './components/style.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoading: true,
      isError: false,
      value: '',
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/');

      if (!response.ok) {
        throw new Error('error');
      }

      const list = await response.json();
      this.setState({
        list,
        isLoading: false
      })
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true,
      })
    }
  }

  handleDelete = (id) => {
    const newList = this.state.list.filter(el => el.id !== id);
    this.setState({
      list: newList,
    })
  };
  handleChange = ({target}) => {
    this.setState({
      value: target.value
    });
  };
  handleSave = () => {
    const id = this.state.list.length + 1000;
    const joined = this.state.list.concat({
      id: id,
      title: this.state.value,
    });
    this.setState({
      list: joined,
      value:'',
    })
  };

  render() {
    if (this.state.isError) {
      return <Notification text="Произошла ошибка, перезагрузите страницу"/>;
    }
    return (
      this.state.isLoading
        ? <Notification text='Загрузка'/>
        : (
          this.state.list.length
            ? (
              <>
                <input type="text" onChange={this.handleChange} className='input' value={this.state.value}/>
                <button onClick={this.handleSave} className='button'> Save</button>
                <ul className='list'>
                  {
                    this.state.list.map(({id, title}) => < Item
                        key={id}
                        handler={() => {
                          this.handleDelete(id)
                        }}
                        title={title}
                      />
                    )
                  }
                </ul>
              </>
            )
            : <Notification text='Список пуст'/>
        )
    )
  }
}


