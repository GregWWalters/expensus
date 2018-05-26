import React from 'react'
import { connect } from 'react-redux'
import State from '../../../types/state'
import { CategoryForClient } from '../../../types/state/category'
import { selectCategoryById } from '../../state/selectors/categoryState'
import { Icon } from '../shared/Icon'
import { IndentSpacer } from '../shared/IndentSpacer'

interface OwnProps {
  categoryId: number
  level?: number
}

interface StateProps {
  category: CategoryForClient
}

type Props = OwnProps & StateProps

interface OwnState {
  isExpanded: boolean
}

class CategoryListItem extends React.PureComponent<Props, OwnState> {
  state = { isExpanded: false }

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { category, level } = this.props
    const { isExpanded } = this.state

    return (
      <>
        <div className="category-list-item">
          {level && <IndentSpacer styles={{ width: `${15 + level * 20}px` }} />}
          <div
            className="category-list-item__expander"
            onClick={this.toggleExpander}>
            {this.hasChildren() ? this.renderExpander() : null}
          </div>
          <div className="category-list-item__name">{category.name}</div>
        </div>
        {isExpanded ? this.renderChildren() : null}
      </>
    )
  }

  hasChildren() {
    return this.props.category.childrenIds.length > 0
  }

  renderChildren() {
    const { category, level } = this.props
    return category.childrenIds.map(childId => (
      <Connected key={childId} categoryId={childId} level={level || 0 + 1} />
    ))
  }

  toggleExpander: React.MouseEventHandler<HTMLDivElement> = event => {
    event.preventDefault()
    this.setState(state => ({ isExpanded: !state.isExpanded }))
  }

  renderExpander() {
    return this.state.isExpanded ? (
      <Icon iconName="minus-box" size="small" />
    ) : (
      <Icon iconName="plus-box" size="small" />
    )
  }
}

const Connected = connect((state: State, props: OwnProps): StateProps => ({
  category: selectCategoryById(state, props.categoryId),
}))(CategoryListItem)

export { Connected as CategoryListItem }
