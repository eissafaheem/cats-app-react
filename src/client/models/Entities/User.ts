export class User {
    _id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    avatarId: number;
    pawints: number;
    isSelected: boolean | undefined;

    constructor(
        id: string | null = null,
        name: string | null = null,
        email: string | null = null,
        password: string | null = null,
        avatarId: number = 0,
        pawints: number = 0
    ) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatarId = avatarId;
        this.pawints = pawints;
    }
}
