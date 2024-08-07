let battleResult = '';

export const setBattleResult = (result) => {
    battleResult = result;
};

export const getBattleResult = () => {
    return battleResult;
};