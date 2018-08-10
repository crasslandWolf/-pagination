
this.showMaxPage = 11;

this.leftNumber = Math.floor(this.showMaxPage / 2);
this.rightNumber = Math.ceil(this.showMaxPage / 3);

/**
 * 计算 indexs
 *
 * @memberof PaginationComponent
 */
function getIndexs () {
    let left = 1; // indexsArray 第一个元素为1
    let right = this.totalPage; // indexsArray 最后一个元素为从页数
    this.indexsArray = []
    /** 
     * 如果总页数大于最大展示量，则需要计算 
     */
    if (this.totalPage >= this.showMaxPage) {
        if (this.current > this.leftNumber && this.current < this.totalPage - this.rightNumber) {
            left = this.current - this.leftNumber;
            right = this.current + this.rightNumber;
        } else {
            if (this.current <= this.leftNumber) {
                left = 1;
                right = this.showMaxPage - 1;
            } else {
                right = this.totalPage;
                left = this.totalPage - (this.showMaxPage - 2);
            }
        }
    }
    // 拿到循环的数据push到arr
    while (left <= right) {
        this.indexsArray.push(left);
        left++;
    }
    // 整理数组前两个元素
    if (this.indexsArray[0] > 1) {
        this.indexsArray[0] = 1;
        this.indexsArray[1] = -1;
    }
    // 整理数组前后两个
    if (this.indexsArray[this.indexsArray.length - 1] < this.totalPage) {
        this.indexsArray[this.indexsArray.length - 1] = this.totalPage;
        this.indexsArray[this.indexsArray.length - 2] = 0;
    }
}

/**
 * 上一页
 *
 * @memberof PaginationComponent
 */
function prevPage () {
    if (this.current <= 1) return;
    this.changePage(this.current - 1)
}

/**
 * 下一页
 *
 * @memberof PaginationComponent
 */
function nextPage () {
    if (this.current >= this.totalPage) return;
    this.changePage(this.current + 1)
}

/**
 * 当前页跳转
 *
 * @param {number} page
 * @memberof PaginationComponent
 */
function changePage(page: number): void {
    if (page < 1) return
    if (this.current !== page) {
        this.current = page;
        this.getIndexs(); // 重新计算  indexsArray
        this.onChange.emit(page);
    }
}