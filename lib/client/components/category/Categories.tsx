import React from 'react'
import { Column, HorizontalDivider } from '../shared/Layouts'
import { RootCategoryList } from './List'

const Categories: React.SFC<{}> = () => (
  <Column className="categories" maxWidth="700px">
    <div className="categories__header">Categories</div>
    <div className="categories__sub-header">
      Categories keep transactions organized within a book. These are things
      like restaurants vs travel vs rent that help you see where your money is
      going.
    </div>
    <HorizontalDivider />
    <div className="categories">
      <RootCategoryList />
    </div>
  </Column>
)

export { Categories }
