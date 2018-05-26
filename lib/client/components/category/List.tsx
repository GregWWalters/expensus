import React from 'react'
import { connect } from 'react-redux'
import State from '../../../types/state'
import {
  selectCategoryIds,
  selectRootCategoryIds,
} from '../../state/selectors/categoryState'
import { CategoryListItem } from './ListItem'

interface StateProps {
  categoryIds: ReadonlyArray<number>
}

const CategoryList: React.SFC<StateProps> = ({ categoryIds }) => (
  <div className="category-list">
    {categoryIds.map(id => <CategoryListItem key={id} categoryId={id} />)}
  </div>
)

export const RootCategoryList = connect((state: State): StateProps => ({
  categoryIds: selectRootCategoryIds(state),
}))(CategoryList)

export const AllCategoriesList = connect((state: State): StateProps => ({
  categoryIds: selectCategoryIds(state),
}))(CategoryList)
