export class SleeperService {
    private readonly baseUrl = "https://api.sleeper.app/v1";

    async getUser(username: string) {
        const response = await fetch(`${this.baseUrl}/user/${username}`);
        return response.json();
    }

    async getUserLeagues(userId: string) {
        const response = await fetch(`${this.baseUrl}/user/${userId}/leagues/nfl/2024`);
        return response.json();
    }

    async getLeague(leagueId: string) {
        const response = await fetch(`${this.baseUrl}/league/${leagueId}`);
        return response.json();
    }

    async getMatchups(leagueId: string, week: number) {
        const response = await fetch(`${this.baseUrl}/league/${leagueId}/matchups/${this.getCurrentNFLWeek()}`);
        return response.json();
    }

    getCurrentNFLWeek(): number {
        const currentDate = new Date();
        const seasonStartDate = new Date(currentDate.getFullYear(), 8, 3); // September 3rd of the current year

        // Adjust start date to the most recent Tuesday
        seasonStartDate.setDate(seasonStartDate.getDate() + (2 - seasonStartDate.getDay() + 7) % 7);

        const timeDiff = currentDate.getTime() - seasonStartDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        const currentWeek = Math.floor(daysDiff / 7) + 1;

        return Math.max(currentWeek, 1); // Ensure the week is at least 1
    }
}