import React, { CSSProperties } from 'react'

interface Props {
  styles: CSSProperties
}

const IndentSpacer: React.SFC<Props> = ({ styles }) => (
  <div style={styles} className="indent-spacer" />
)

export { IndentSpacer }
