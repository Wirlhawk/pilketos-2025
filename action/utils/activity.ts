export const activityMessage = {
    addQueue: (name: string) =>
        `${name} added to queue`,
    removeQueue: (name: string) =>
        `${name} removed from queue`,
    enterBilik: (name: string, bilikNumber: number) =>
        `${name} entered Bilik ${bilikNumber}`,
    removeBilik: (name: string, bilikNumber: number) =>
        `${name} removed from Bilik ${bilikNumber}`,
    completeVote: (name: string, bilikNumber: number) =>
        `${name} completed voting in Bilik ${bilikNumber}`,
    system: (msg: string) => msg
};
