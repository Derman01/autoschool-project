interface IGroup {
    id: string;
    name: string;
}

export class GroupModel implements IGroup {
    public get title() {
        return this.name;
    }

    constructor(data: IGroup) {
        this.id = data.id;
        this.name = data.name;
    }

    id: string;
    name: string;
}
