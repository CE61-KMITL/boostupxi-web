import { writable, type Writable } from 'svelte/store';
import type { ILeaderboardData, ILeaderboardGroup } from '$/interface/leaderboard';
import { leaderboardService } from '$/services/leaderboard.services';

export const leaderboardDataStore: Writable<ILeaderboardData[]> = writable<ILeaderboardData[]>([]);
export const leaderboardGroupDataStore: Writable<ILeaderboardGroup[]> = writable<ILeaderboardGroup[]>([]);
export const leaderboardPage: Writable<number> = writable<number>(0);

export const fetchLeaderboardData = async (page: number) => {
    const response = await leaderboardService.getLeaderboard(page);
    leaderboardDataStore.set(response.data);
    leaderboardPage.set(response.pages);
}

export const fetchLeaderboardGroupData = async () => {
    const response = await leaderboardService.getLeaderboardGroup();
    leaderboardGroupDataStore.set(response);
}