import _ from 'lodash';

export const tetrominoDataCollideGameBoardData = ({
  gameBoardData,
  tetrominoData
}) => {
  const tetrominoLayer = findLayer(tetrominoData);
  const {
    position: { x: initialX, y: initialY }
  } = tetrominoData;

  return !!tetrominoLayer.find(tetrominoLayerCell => {
    return gameBoardData.find(gameBoardDataCell => {
      return (
        tetrominoLayerCell.x + initialX === gameBoardDataCell.x &&
        tetrominoLayerCell.y + initialY === gameBoardDataCell.y
      );
    });
  });
};

export const findLayer = tetrominoData => {
  const { layers, currentLayerIndex } = tetrominoData;

  return layers[currentLayerIndex];
};

export const downTetromino = ({ gameBoardData, tetrominoData }) => {
  const tetrominoDataDowned = _.cloneDeep(tetrominoData);

  tetrominoDataDowned.position.y++;
  if (
    !tetrominoDataCollideGameBoardData({
      gameBoardData,
      tetrominoData: tetrominoDataDowned
    })
  )
    return tetrominoDataDowned;

  return undefined;
};
