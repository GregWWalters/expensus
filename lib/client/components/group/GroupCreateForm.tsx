import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { RequestState } from '../../../types'
import { ClientApiError } from '../../../types/api'
import State from '../../../types/state'
import { submitCreateGroupRequest } from '../../actions/GroupActions'
import {
  selectSubmitGroupError,
  selectSubmitGroupStatus,
} from '../../state/selectors/groupState'
import { Button } from '../shared/Button'
import { TextInput } from '../shared/TextInput'

interface StateProps {
  submitGroupStatus: RequestState
  submitGroupError: ClientApiError | null
}

interface DispatchProps {
  submitGroup: (groupName: string) => void
}

interface OwnState {
  groupName: string
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps

class GroupCreateForm extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props)
    this.state = { groupName: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <form className="group-create-form" onSubmit={this.handleSubmit}>
        <TextInput
          className="group-create-form__input"
          type="text"
          name="groupName"
          placeholder="Group Name"
          onChange={this.handleChange}
        />
        <Button
          className="group-create-form__button"
          type="submit"
          disabled={!this.validateForm()}
          loading={this.props.submitGroupStatus === RequestState.REQUESTING}>
          Create Group
        </Button>
      </form>
    )
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  validateForm() {
    return this.state.groupName.length > 4
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault()
    if (this.validateForm()) {
      this.props.submitGroup(this.state.groupName)
    }
  }
}

const connected = withRouter(
  connect<StateProps, DispatchProps, {}, State>(
    state => ({
      submitGroupError: selectSubmitGroupError(state),
      submitGroupStatus: selectSubmitGroupStatus(state),
    }),
    (dispatch: Dispatch<State>) => ({
      submitGroup: groupName => dispatch(submitCreateGroupRequest(groupName)),
    })
  )(GroupCreateForm)
)

export { connected as GroupCreateForm }
