import React from 'react'
import { ItemForClient } from '../../../types/state/item'
import { Icon } from '../shared/Icon'

interface Props {
  item: ItemForClient
}

const ItemListItem: React.SFC<Props> = ({ item }) => (
  <div className="item-list-item">
    <div className="item-list-item__icon">
      <Icon iconName="bank" />
    </div>
    <div className="item-list-item__name">{item.name}</div>
    <div className="item-list-item__actions">
      <div>None</div>
    </div>
  </div>
)

export { ItemListItem }
