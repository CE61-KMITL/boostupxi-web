import { writable } from 'svelte/store';
import type { ILeaderboardData } from '../interface/leaderboard';
import { leaderboardService } from '../services/leaderboard.services';

export const leaderboardDataStore = writable<ILeaderboardData[]>([]);

export async function fetchLeaderboardData() {
    const response = await leaderboardService.getLeaderboard();
    leaderboardDataStore.set(response.data);
}