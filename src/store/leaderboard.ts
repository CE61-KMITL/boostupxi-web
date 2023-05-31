import { writable, type Writable } from 'svelte/store';
import type { ILeaderboardData, ILeaderboardGroup } from '../interface/leaderboard';
import { leaderboardService } from '../services/leaderboard.services';

export const leaderboardDataStore: Writable<ILeaderboardData[]> = writable<ILeaderboardData[]>([]);
export const leaderboardGroupDataStore: Writable<ILeaderboardGroup[]> = writable<ILeaderboardGroup[]>([]);
export const leaderboardPage: Writable<number> = writable<number>(0);

export async function fetchLeaderboardData(page: number) {
    const response = await leaderboardService.getLeaderboard(page);
    leaderboardDataStore.set(response.data);
    leaderboardPage.set(response.pages);
}

export async function fetchLeaderboardGroupData() {
    const response = await leaderboardService.getLeaderboardGroup();
    leaderboardGroupDataStore.set(response);
}