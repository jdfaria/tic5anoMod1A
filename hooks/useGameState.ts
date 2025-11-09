import { useState, useEffect } from 'react';
import { PlayerState } from '../types';
import { missions } from '../data/content';

const getInitialState = (): PlayerState => {
  try {
    const savedState = localStorage.getItem('cyberQuestPlayerState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    // FIX: Wrapped the console.error call in a block for correct catch syntax.
    console.error("Failed to parse player state from localStorage", error);
  }
  return {
    xp: 0,
    level: 1,
    completedMissionIds: [],
    unlockedBadgeIds: [],
    missionScores: {},
    avatar: {
      bgColor: 'bg-orange-500',
      icon: 'fa-user-secret'
    }
  };
};

export const useGameState = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem('cyberQuestPlayerState', JSON.stringify(playerState));
    } catch (error) {
      console.error("Failed to save player state to localStorage", error);
    }
  }, [playerState]);

  const addXp = (amount: number) => {
    setPlayerState(prevState => {
      const newXp = prevState.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      return { ...prevState, xp: newXp, level: newLevel };
    });
  };

  const completeMission = (missionId: string, score: number) => {
    setPlayerState(prevState => {
      if (prevState.completedMissionIds.includes(missionId)) {
        return prevState;
      }
      
      const mission = missions.find(m => m.id === missionId);
      const badgeId = mission?.badgeId;
      const newUnlockedBadgeIds = badgeId && !prevState.unlockedBadgeIds.includes(badgeId)
        ? [...prevState.unlockedBadgeIds, badgeId]
        : prevState.unlockedBadgeIds;

      const newMissionScores = { ...prevState.missionScores, [missionId]: score };

      return {
        ...prevState,
        completedMissionIds: [...prevState.completedMissionIds, missionId],
        unlockedBadgeIds: newUnlockedBadgeIds,
        missionScores: newMissionScores,
      };
    });
  };

  const resetProgress = () => {
     const freshState: PlayerState = {
        xp: 0,
        level: 1,
        completedMissionIds: [],
        unlockedBadgeIds: [],
        missionScores: {},
        avatar: {
          bgColor: 'bg-orange-500',
          icon: 'fa-user-secret'
        }
    };
    setPlayerState(freshState);
  }

  return { playerState, addXp, completeMission, resetProgress };
};
