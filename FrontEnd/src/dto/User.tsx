 class User {
    _id? :string;
    name : string;
    job : string;
    constructor(name : string, job : string){
        this.name = name;
        this.job = job;
    }
}

export default User;