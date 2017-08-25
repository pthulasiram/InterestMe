import React, {Component} from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {editPin, deletePin, getPins} from '../../../actions/pin_actions'

class PinHeaderEditModalPresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      id: this.props.id
    }
    this.update = this.update.bind(this)
  }

  update(text) {
    console.log(this.state);
    return e => this.setState({
      [text]: e.currentTarget.value
    })
  }

  componentDidMount() {
    this.setState({
      body: this.props.body,
      title: this.props.title
    })
  }

  async _handleSubmit(e) {
    e.preventDefault()
    let edit = this.props.editPin(this.state)
    let refresh = this.props.getPins(this.props.boardId)
    await Promise.all([edit, refresh])
    this.props.toggleModal()
  }

  async _handleDelete(e) {
    e.preventDefault()
    let deletePin = this.props.deletePin(this.props.id)
    let refresh = this.props.getPins(this.props.boardId)
    await Promise.all([deletePin, refresh])
    this.props.toggleModal('delete')
  }

  editForm() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <input
          autoFocus
          type='text'
          onChange={this.update('title')}
          defaultValue={this.state.title}
        />
        <textarea
          onChange={this.update('body')}
          placeholder="What's this pin about?"
          >
            {this.state.body}
          </textarea>
          <div>
            <button type='Submit' value='Submit'>
              Update
            </button>
            <button onClick={() => this.props.toggleModal()}>
              Cancel
            </button>
            <button onClick={this._handleDelete.bind(this)}>
              Delete
            </button>
          </div>
        </form>
    )
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={() => this.props.toggleModal()}
        contentLabel="Modal"
        className="ReactModal__Content"
        >
          {this.editForm()}
        </Modal>
    )
  }
}

const mapStateToProps = ({pins}) =>({
  pins
})

const mapDispatchToProps = dispatch => ({
  editPin: pin => dispatch(editPin(pin)),
  deletePin: id => dispatch(deletePin(id)),
  getPins: (id) => dispatch(getPins(id))
})

const PinHeaderEditModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinHeaderEditModalPresentational)

export default PinHeaderEditModal