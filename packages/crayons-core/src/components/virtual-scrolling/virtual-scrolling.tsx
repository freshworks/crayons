/* eslint-disable */
import { Component, Prop, State, Element, Host, h } from '@stencil/core';
import { throttle } from 'throttle-debounce';
@Component({
  tag: 'fw-virtual-scrolling',
  shadow: true
})
export class StencilVirtualScrolling {
  @Element() host: HTMLFwVirtualScrollingElement;
  /**
   * Height of the container that would remain visible
   */
  @Prop() scrollContainerHeight: number;
  /**
   * for now, only fixed height rows can be rendered in the component
   */
  @Prop() rowsLength: number;
  /**
   * Fixed height of rows
   */
  @Prop() rowHeight: number;
  /**
   * Function for rendering different type of lists/rows
   */
  @Prop() rowRenderer: (rowStyles:{ [key: string]: string; }, fromRow: number, toRow: number, parentStyles:{ [key: string]: string; }) => any;

  @State() state = {
    contentHeight: 0,
    startRowsFrom: 0,
    endRowsTo: 0,
    rowsThatCanBeShownInVisibleArea: 0,
    alreadyScrolledRows: 0,
    totalRowsToDisplay: undefined,
    scrollPos: undefined
  };

  private stop = false;
  private frameCount = 0;
  private fpsInterval = 1000 / 60;
  private then = Date.now();
  private startTime = this.then;
  private ticking=false;
  private enableFPSLogging =true;
  private cache ={};

  componentWillLoad(){
    this.updateContent(this.state.scrollPos || 0);
  }

  componentWillUpdate(){
    this.updateContent(this.state.scrollPos || 0);
  }

  memoizedPopulateList = () => {
    return async (scrollTop:number) => {
      if (this.cache.hasOwnProperty(scrollTop)) {
        console.log('Fetching from cache');
        return this.cache[scrollTop];
      }
      else {
        console.log('Calculating result');
        let result = await this.populateList(scrollTop)
        this.cache[scrollTop] = result;
        return result;
      }
    }
  }

  populateList= async (yPos:number)=>{

    const virtualScrollContainerHeight = this.scrollContainerHeight > window.innerHeight ? window.innerHeight : this.scrollContainerHeight;
    const totalRowsToDisplay = this.rowsLength;
    const contentHeight = this.rowsLength * this.rowHeight;
    const alreadyScrolledRows = parseInt(String(yPos / this.rowHeight), 10);
    const rowsThatCanBeShownInVisibleArea = Math.ceil(virtualScrollContainerHeight / this.rowHeight);
    let startRowsFrom = parseInt(String(Math.max(0, alreadyScrolledRows)), 10)-10;
    startRowsFrom = (startRowsFrom<0)?0:startRowsFrom;
    const endRowsTo = alreadyScrolledRows + rowsThatCanBeShownInVisibleArea+10;
    this.state = ({
      contentHeight: contentHeight,
      startRowsFrom,
      endRowsTo: endRowsTo,
      rowsThatCanBeShownInVisibleArea,
      totalRowsToDisplay,
      alreadyScrolledRows,
      scrollPos: yPos
    });
    return {
      contentHeight: contentHeight,
      startRowsFrom,
      endRowsTo: endRowsTo,
      rowsThatCanBeShownInVisibleArea,
      totalRowsToDisplay,
      alreadyScrolledRows,
      scrollPos: yPos
    };
  }

  async updateContent(yPos:number) {
    if (this.stop) {
      return;
    }
    const getMemoizedPopulateList = this.memoizedPopulateList();
    this.state = await getMemoizedPopulateList(yPos);
    this.ticking = false;
  }

  async detectFps(now:number) {
    var sinceStart = now - this.startTime;
    var currentFps = Math.round(1000 / (sinceStart / ++ this.frameCount) * 100) / 100;
    console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
  }

  scrollList = (e) => {
    let scrollTop = e.target.scrollTop;
    const throttleFunc =throttle(1500,false, ()=>{
      window.requestAnimationFrame(async() => {
        await this.updateContent(scrollTop);
      });
    });
   
    if(!this.ticking){
      let now = Date.now();
      let elapsed = now - this.then;
      if (elapsed > this.fpsInterval) {
          // Get ready for next frame by setting then=now, but...
          // Also, adjust for fpsInterval not being multiple of 16.67
          this.then = now - (elapsed % this.fpsInterval);
          throttleFunc();         
      }
      this.ticking = true;
    }
  }

  render() {
    this.enableFPSLogging && this.detectFps(Date.now());
    const { scrollContainerHeight, rowHeight } = this;
    const totalRowHeight = this.rowsLength * rowHeight;
    const activateVirtualScroll = totalRowHeight > scrollContainerHeight;
    // Finding out maximum height of the container-
    const virtualScrollHeight = (scrollContainerHeight > window.innerHeight) ? window.innerHeight : scrollContainerHeight;
    return (
      <Host style={{ height: `${virtualScrollHeight}px`, overflowY: 'auto', display: 'block' }} onScroll={this.scrollList}>
        {
          activateVirtualScroll
            ? this.rowRenderer(
                { transform: `translateY(${this.state.startRowsFrom * this.rowHeight}px)`, height: `${rowHeight}px` },
                this.state.startRowsFrom,
                this.state.endRowsTo,
                { height: `${totalRowHeight}px` }
              )
            : this.rowRenderer(
                { transform: 'translateY(0px)', height: `${rowHeight}px` },
                0,
                this.rowsLength,
                { height: `${totalRowHeight}px` }
              )
        }
      </Host>
    );
  }
}
