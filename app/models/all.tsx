export type UserPreview = {
    username: string;
    email: string;
    user_id: number;
};

export type garagePreview = {
    name: string;
    location: string;
    description: string;
    garage_id: number;
}

export type garage = {
    name: string;
    location: string;
    description: string;
    visible: boolean;
    garage_id: number;
}

export type itemPreview = {
    name: string;
    description: string;
    item_id: number;
}

export type item = {
    name: string;
    description: string;
    item_id: number;
    garage_id: number;
    location: string;
}

export type searchResult = {
    name: string;
    description: string;
    item_id: number;
    garage_id: number;
    location: string;
}