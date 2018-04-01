import React from 'react'
import { connect } from 'react-redux'
import { UpdateBookParams } from '../../../types/api/book.types'
import State from '../../../types/state'
import { BookForClient } from '../../../types/state/book'
import { submitUpdateBookRequest } from '../../actions/BookActions'
import { selectIsBookUpdatingById } from '../../state/selectors/bookState'
import { Button } from '../shared/Button'
import { Icon } from '../shared/Icon'
import { TextInput } from '../shared/TextInput'

interface OwnProps {
  book: BookForClient
}

interface StateProps {
  updating: boolean
}

interface DispatchProps {
  updateBook: (params: UpdateBookParams) => Promise<void>
}

type Props = OwnProps & StateProps & DispatchProps

interface OwnState {
  editMode: boolean
  bookName: string
}

class BookListItem extends React.PureComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      bookName: props.book.name,
      editMode: false,
    }
  }

  render() {
    const { book, updating } = this.props
    const { bookName, editMode } = this.state
    return (
      <div className="book-list-item">
        <div className="book-list-item__icon">
          <Icon iconName="book" />
        </div>
        {!editMode ? (
          <>
            <div className="book-list-item__name">{book.name}</div>
            <div
              onClick={this.toggleEditMode}
              className="book-list-item__open-edit-button">
              <Icon size="small" iconName="pencil" />
            </div>
          </>
        ) : (
          <>
            <TextInput
              className="book-list-item__edit-book-name"
              onChange={this.handleChange}
              name="bookName"
              type="text"
              value={bookName}
            />
            <Button
              className="book-list-item__edit-button"
              disabled={updating}
              onClick={this.resetEditMode}>
              Cancel
            </Button>
            <Button
              className="book-list-item__edit-button"
              loading={updating}
              onClick={this.handleSubmit}>
              Save
            </Button>
          </>
        )}
      </div>
    )
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  resetEditMode = () => {
    this.setState({
      bookName: this.props.book.name,
      editMode: false,
    })
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }))
  }

  handleSubmit = () => {
    const { id } = this.props.book
    const { bookName } = this.state
    this.props.updateBook({ id, name: bookName }).then(() => {
      this.resetEditMode()
    })
  }
}

const connected = connect<StateProps, DispatchProps, OwnProps, State>(
  (state, props) => ({
    updating: selectIsBookUpdatingById(state, props.book.id),
  }),
  dispatch => ({
    updateBook: params => dispatch(submitUpdateBookRequest(params)),
  })
)(BookListItem)

export { connected as BookListItem }
