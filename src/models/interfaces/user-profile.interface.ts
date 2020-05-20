export interface UserProfile {
    userId: number,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    interests: string[],
    city: string,
    country: string,
    bio: string
}