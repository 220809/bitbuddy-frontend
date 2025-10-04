let currentUser: User | undefined;

export const getCurrentUserState = () => currentUser;

export const setCurrentUserState = (user: User | undefined) => {
    currentUser = user;
}