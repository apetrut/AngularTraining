export class LikeComponent {
    constructor(private _likesCount: number, private _isSelected: boolean)
    {
    }

    get likesCount()
    {
        return this._likesCount;
    }

    get isSelected()
    {
        return this._isSelected;
    }

    onClick(){
        this._likesCount += (this.isSelected) ? 1 : -1;
        this._isSelected = !this.isSelected;
    }
}