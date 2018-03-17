import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { RequestState } from '../../../types'
import { ClientApiError } from '../../../types/api'
import State from '../../../types/state'
import { submitCreateBookRequest } from '../../actions/BookActions'
import {
  selectSubmitBookError,
  selectSubmitBookStatus,
} from '../../state/selectors/bookState'
import { Button } from '../shared/Button'
import { TextInput } from '../shared/TextInput'

interface StateProps {
  submitBookStatus: RequestState
  submitBookError: ClientApiError | null
}

interface DispatchProps {
  submitBook: (bookName: string) => Promise<void>
}

interface OwnState {
  bookName: string
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps

class BookCreateForm extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props)
    this.state = { bookName: '' }
  }

  render() {
    return (
      <form className="book-create-form" onSubmit={this.handleSubmit}>
        <TextInput
          className="book-create-form__input"
          type="text"
          name="bookName"
          value={this.state.bookName}
          placeholder="Book Name"
          onChange={this.handleChange}
        />
        <Button
          className="book-create-form__button"
          type="submit"
          disabled={!this.validateForm()}
          loading={this.props.submitBookStatus === RequestState.REQUESTING}>
          Create Book
        </Button>
      </form>
    )
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  validateForm() {
    return this.state.bookName.length > 3
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault()
    if (this.validateForm()) {
      this.props.submitBook(this.state.bookName).then(() => {
        this.setState({ bookName: '' })
      })
    }
  }
}

const connected = withRouter(
  connect<StateProps, DispatchProps, {}, State>(
    state => ({
      submitBookError: selectSubmitBookError(state),
      submitBookStatus: selectSubmitBookStatus(state),
    }),
    (dispatch: Dispatch<State>) => ({
      submitBook: bookName => dispatch(submitCreateBookRequest(bookName)),
    })
  )(BookCreateForm)
)

export { connected as BookCreateForm }
