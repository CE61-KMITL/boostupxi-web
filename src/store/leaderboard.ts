import { writable } from 'svelte/store';
import type { ILeaderboardData, ILeaderboardGroup } from '../interface/leaderboard';
import { leaderboardService } from '../services/leaderboard.services';

export const leaderboardDataStore = writable<ILeaderboardData[]>([]);
export const leaderboardGroupDataStore = writable<ILeaderboardGroup[]>([]);
export const leaderboardPage = writable<number>(0);

export async function fetchLeaderboardData(page: number) {
    const response = await leaderboardService.getLeaderboard(page);
    leaderboardDataStore.set(response.data);
    leaderboardPage.set(response.pages);
}

export async function fetchLeaderboardGroupData() {
    const response = await leaderboardService.getLeaderboardGroup();
    leaderboardGroupDataStore.set(response);
}