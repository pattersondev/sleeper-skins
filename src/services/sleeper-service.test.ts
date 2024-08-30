import { SleeperService } from './sleeper-service';
const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('SleeperService', () => {
    let sleeperService: SleeperService;
    const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

    beforeEach(() => {
        sleeperService = new SleeperService();
        jest.resetAllMocks();
    });

    it('should get user', async () => {
        const mockUser = { username: 'testuser', user_id: '123456' };
        mockedFetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockUser),
        } as any);

        const result = await sleeperService.getUser('testuser');
        expect(result).toEqual(mockUser);
        expect(mockedFetch).toHaveBeenCalledWith('https://api.sleeper.app/v1/user/testuser');
    });

    it('should get user leagues', async () => {
        const mockLeagues = [{ league_id: '789', name: 'Test League' }];
        mockedFetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockLeagues),
        } as any);

        const result = await sleeperService.getUserLeagues('123456');
        expect(result).toEqual(mockLeagues);
        expect(mockedFetch).toHaveBeenCalledWith('https://api.sleeper.app/v1/user/123456/leagues/nfl/2024');
    });

    it('should get league', async () => {
        const mockLeague = { league_id: '789', name: 'Test League' };
        mockedFetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockLeague),
        } as any);

        const result = await sleeperService.getLeague('789');
        expect(result).toEqual(mockLeague);
        expect(mockedFetch).toHaveBeenCalledWith('https://api.sleeper.app/v1/league/789');
    });

    it('should get matchups', async () => {
        const mockMatchups = [{ matchup_id: '1', team1: 'Team A', team2: 'Team B' }];
        mockedFetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockMatchups),
        } as any);

        jest.spyOn(sleeperService, 'getCurrentNFLWeek').mockReturnValue(5);

        const result = await sleeperService.getMatchups('789', 5);
        expect(result).toEqual(mockMatchups);
        expect(mockedFetch).toHaveBeenCalledWith('https://api.sleeper.app/v1/league/789/matchups/5');
    });

    it('should calculate current NFL week correctly', () => {
        const mockDate = new Date('2023-09-15T12:00:00Z');
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

        const result = sleeperService.getCurrentNFLWeek();
        expect(result).toBe(2);
    });
});