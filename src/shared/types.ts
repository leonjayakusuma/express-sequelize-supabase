// Shared type definitions

export interface ProfileInfo {
    id: number;
    name: string;
    email: string;
    dateJoined: string;
}

export interface PublicUserInfo {
    id: number;
    name: string;
    dateJoined: string;
}

export interface UserPageInfo {
    id: number;
    name: string;
    dateJoined: string;
    reviews: UserReview[];
    numReviews: number;
    meanRating: number;
}

export interface UserReview {
    reviewId: number;
    itemId: number;
    itemName: string;
    rating: number;
    reviewTxt: string | undefined;
    dateCreated: string;
    isDeleted: boolean;
}

export interface Review {
    id?: number;
    reviewId?: number;
    itemId: number;
    userId: number;
    userName: string;
    rating: number;
    reviewTxt: string | undefined;
    dateCreated: string;
    isDeleted: boolean;
    isFlagged?: boolean;
}

export interface Item {
    id: number;
    title: string;
    desc: string;
    price: number;
    discount: number;
    tags: string[];
    reviewCount: number;
    reviewRating: number;
    isSpecial: boolean;
    imgUrl?: string;
}

// CartItem uses a simplified item structure from the database
export interface CartItem {
    item: {
        id: number;
        title: string;
        description: string;
        price: number;
        discount: number;
        isSpecial: boolean;
        imgUrl?: string;
    };
    quantity: number;
}

export interface PersonalInfo {
    userId?: number;
    isMale?: boolean;
    age: number;
    weight: number;
    weightGoal: number;
    weightGainPerWeek: number;
    height: number;
    bodyFatPerc: number;
    activityLevel: string;
    healthGoal: string;
    dietaryPreference: string;
    sex?: string; // "male" or "female" - used in response
}

export interface Recipe {
    id: number;
    name: string;
    link: string;
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
    ingredients: string[];
    instructions: string[];
}

