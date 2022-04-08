/* eslint-disable */
import { Component, h } from '@stencil/core';

@Component({
  tag: 'virtual-scrolling-demo',
  shadow: true
})
export class VirtualScrollingDemo {
  data = Array(500000).fill(0).map((_, i) => i+1);

  render() {
    return (
      <fw-virtual-scrolling
        scrollContainerHeight={400}
        rowHeight={25}
        rowsLength={this.data.length}
        rowRenderer={this.contentRenderer}
      />
    );
  }

  renderRows = (fromRow:number, toRow:number, styles:{ [key: string]: string; }) => {
    const generatedRows = [];
    let _toRow = (toRow>this.data.length)? this.data.length:toRow;
    for (let i = fromRow; i <_toRow; i++) {
      generatedRows.push(<li style={styles} innerHTML={'List item ' + i} />);
    }
    return generatedRows;
  }
  
  contentRenderer = (rowStyles:{ [key: string]: string; }, fromRow:number, toRow:number, parentStyles:{ [key: string]: string; }) => {
    return (
      <ul style={parentStyles}>
        {this.renderRows(fromRow, toRow, rowStyles)}
      </ul>
    );
  }
}
